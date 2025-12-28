import express from "express";
import cookieParser from "cookie-parser";
import userRoute from "./routes/user.routes.js";
import cors from "cors";
import courseRoute from "./routes/course.routes.js";
import paymentRoute from "./routes/payment.routes.js";
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT"],
    credentials: true,
  })
);
app.use(cookieParser());

app.use("/api/v1/user/", userRoute);
app.use("/api/v1/course/", courseRoute);
app.use("/api/v1/payment/", paymentRoute);

export default app;
