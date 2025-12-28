import mongoose from "mongoose";
import JWT from "jsonwebtoken";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "User already exist with this email"],
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: [true, "Phone is required"],
      unique: [true, "User already exist wih this phone number"],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    avatar: {
      type: String,
      default:
        "https://th.bing.com/th/id/OIP.obV5KTWZPdbxODJekwix4gHaHa?w=166&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7",
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
    enrolledCourses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
    forgotPasswordToken: String,
    forgotPasswordExpire: Date,
  },
  { timestamps: true }
);

/*=================>>Password increption<<=================*/
// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();
//   this.password = await bcrypt.hash(this.password, 10);
// });
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  this.password = bcrypt.hash(this.password, 10);
});

userSchema.methods = {
  comparePassword: async function (plainPassword) {
    return await bcrypt.compare(plainPassword, this.password);
  },

  generateToken: function () {
    return JWT.sign(
      {
        id: this.id,
        name: this.name,
        email: this.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: 604800 }
    );
  },
};

export const User = mongoose.model("User", userSchema);
