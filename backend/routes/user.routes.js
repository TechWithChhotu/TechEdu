import express from "express";
import {
  login,
  loginOrRegister,
  ping,
  register,
} from "../controllers/user.controllers.js";

const userRoute = express.Router();

userRoute.get("/ping", ping);
userRoute.post("/login-register", loginOrRegister);
userRoute.post("/sign-up", register);
userRoute.post("/sign-in", login);

export default userRoute;
