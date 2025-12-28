import { check, validationResult } from "express-validator";
import sendOTPonNumber from "../utils/send.phone.utils.js";
import redisClient from "../helper/redis.helper.js";
import { User } from "../models/user.models.js";
import v2 from "cloudinary";
import fs from "fs";

/*======================loginOrRegister======================*/
const loginOrRegister = async (req, res) => {
  try {
    const { phone } = req.body;

    const existingUser = await User.findOne({ phone });

    const OTP = await sendOTPonNumber(`+91${phone}`);
    // const OTP = 895285;
    //sendOnWhatsApp();

    if (OTP == 111111) {
      return res.status(400).json({
        success: false,
        exist: false,
        message: "Unable to send otp! Re-check phone number and try again",
        OTP: 111111,
      });
    }

    const otpKey = `otp:${phone}`;

    await redisClient.setEx(otpKey, 300, `${OTP}`); // 300 seconds or 5 minutes to expire otp

    if (existingUser) {
      return res.status(201).json({
        success: true,
        exist: true,
        message: `User exist! OTP send to phone ${phone}.`,
        OTP: OTP,
      });
    }

    res.status(201).json({
      success: true,
      message: `User does not exist! OTP send to phone ${phone}.`,
      exist: false,
      OTP,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error,
      message: "Some went wrong, plz try again",
    });
  }
};

/*======================Sign-Up======================*/
const register = async (req, res) => {
  const validationRules = [
    check("name").notEmpty().withMessage("Name is required"),
    check("email").isEmail().withMessage("Invalid email address"),
    check("phone").isMobilePhone().withMessage("Invalid phone number"),
    check("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ];

  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, phone, password, userOTP } = req.body;
  const otpKey = `otp:${phone}`;
  const storedOtp = await redisClient.get(otpKey);

  if (userOTP === storedOtp) {
    try {
      const user = await User.findOne({ email, phone });

      const newUser = await User.create({
        name,
        email,
        phone,
        password,
      });

      if (!newUser) {
        return res.json({
          success: false,
          message: "Something went wrong in creating user, plz try again",
        });
      }

      /*----------------------Set-Cookie----------------------*/
      const token = await newUser.generateToken();
      res.cookie("TechEdu", token);

      //==============

      res.json({
        success: true,
        message: "User created successfully",
        data: newUser,
      });
    } catch (error) {
      res.json({
        success: false,
        message: error.message,
      });
    }
  } else {
    res.json({
      success: false,
      message: "OTP Invalid",
    });
  }
};

/*======================Sign-In======================*/
const login = async (req, res) => {
  try {
    const validationRules = [
      check("phone").isMobilePhone().withMessage("Invalid phone number"),
    ];

    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { phone, userOTP } = req.body;
    const otpKey = `otp:${phone}`;
    const storedOtp = await redisClient.get(otpKey);

    if (userOTP === storedOtp) {
      const user = await User.findOne({ phone });
      const token = user.generateToken();
      res.cookie("TechEdu", token);

      res.status(200).json({
        success: true,
        message: "Login successfully",
        user,
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getUserProfile = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: "You are not login!",
      data: req.user,
    });
  }
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    message: "Your data available",
    data: user,
  });
};

/*======================Edit-Profile======================*/
const editProfile = async (req, res) => {
  try {
    const { name } = req.body;
    // ****************--> file upload start*********************

    // const user = await User.findOne({  });
    const user = await User.findById(req.user.id);

    if (req.file) {
      try {
        // const result = await v2.uploader.upload(req.file.path, {
        //   folder: "TechEdu",
        //   width: 250,
        //   height: 250,
        //   crop: "fill",
        //   gravity: "face",
        // });

        const result = await v2.uploader.upload(req.file.path, {
          folder: "TechEdu",
        });

        // 🔥 CREATE TRANSFORMED AVATAR URL
        const avatarUrl = v2.url(result.public_id, {
          width: 250,
          height: 250,
          crop: "fill",
          gravity: "face",
          quality: "auto",
          fetch_format: "auto",
        });

        // save transformed url

        if (result) {
          user.avatar = avatarUrl;

          fs.unlinkSync(req.file.path);
        }
      } catch (err) {
        // new AppError(`file not uploaded please try again, ERROR: ${err}`, 500);
        return res.status(400).json({
          success: false,
          message: `file not uploaded please try again, ${err}`,
          data: null,
        });
      }
    }
    // ****************--> file upload end*********************
    user.name = name;
    await user.save();

    res.status(201).json({
      success: true,
      message: "Updated successfully",
      data: user,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

const getMyCourses = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).populate("enrolledCourses"); // 🔥 MAGIC

    res.status(200).json({
      success: true,
      courses: user.enrolledCourses,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch enrolled courses",
    });
  }
};

// export const editProfile = async (req, res, next) => {
//   try {
//     // 1️⃣ Check authentication
//     if (!req.user || !req.user.id) {
//       return res.status(401).json({
//         success: false,
//         message: "You are not logged in",
//       });
//     }

//     const { name } = req.body;

//     // 2️⃣ Find user
//     const user = await User.findById(req.user.id);

//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     // 3️⃣ Update allowed fields only
//     if (name) {
//       user.name = name;
//     }

//     // 4️⃣ Handle avatar upload (optional)
//     if (req.file) {
//       user.avatar = req.file.path; // local / cloudinary url
//     }

//     // 5️⃣ Save updated user
//     await user.save();

//     // 6️⃣ Send response (never send password)
//     res.status(200).json({
//       success: true,
//       message: "Profile updated successfully",
//       data: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         avatar: user.avatar,
//       },
//     });
//   } catch (error) {
//     console.error("Edit Profile Error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Server error while updating profile",
//     });
//   }
// };

const ping = (req, res) => {
  res.status(200).json({
    msg: "Successful",
    data: "Pong",
  });
};
export {
  ping,
  loginOrRegister,
  login,
  register,
  getUserProfile,
  editProfile,
  getMyCourses,
};
