import express from "express";
import {
  editProfile,
  getUserProfile,
  login,
  loginOrRegister,
  ping,
  register,
} from "../controllers/user.controllers.js";
import isLoggedIn from "../middlewares/isAuthenticated.js";
import upload from "../middlewares/multer.middleware.js";
const userRoute = express.Router();

userRoute.get("/ping", ping);
userRoute.post("/login-register", loginOrRegister);
userRoute.post("/sign-up", register);
userRoute.post("/sign-in", login);
userRoute.get("/get-user-profile", isLoggedIn, getUserProfile);
userRoute.put(
  "/edit-profile",
  isLoggedIn,
  upload.single("avatar"),
  editProfile
);

export default userRoute;
