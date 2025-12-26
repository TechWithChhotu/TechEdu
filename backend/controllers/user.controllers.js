import { User } from "../models/user.models.js";
import { check, validationResult } from "express-validator";
import sendOTPonNumber from "../utils/send.phone.utils.js";
import redisClient from "../helper/redis.helper.js";

/*======================loginOrRegister======================*/
const loginOrRegister = async (req, res) => {
  try {
    const { phone } = req.body;

    const existingUser = await User.findOne({ phone });

    const OTP = await sendOTPonNumber(`+91${phone}`);
    // const OTP = 895285;
    //sendOnWhatsApp();
    const otpKey = `otp:${phone}`;

    await redisClient.setEx(otpKey, 300, `${OTP}`); // 300 seconds or 5 minutes to expire otp

    if (existingUser) {
      return res.status(201).json({
        success: true,
        exist: true,
        message: "User exist",
        OTP: OTP,
      });
    }

    res.status(201).json({
      success: true,
      message: "User does not exist",
      exist: false,
      OTP,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
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

const ping = (req, res) => {
  res.status(200).json({
    msg: "Successful",
    data: "Pong",
  });
};
export { ping, loginOrRegister, login, register };
