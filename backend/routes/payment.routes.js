import express from "express";
import { order, verify } from "../controllers/payment.controllers.js";
import isLoggedIn from "../middlewares/isAuthenticated.js";
// GET  /course/:id
const paymentRoute = express.Router();

paymentRoute.post("/order", isLoggedIn, order);
paymentRoute.post("/verify", isLoggedIn, verify);

export default paymentRoute;
