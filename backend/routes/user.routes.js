import express from "express";
import { ping } from "../controllers/user.controllers.js";

const userRoute = express.Router();
userRoute.get("/ping", ping);

export default userRoute;
