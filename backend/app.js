import express from "express";
import cookieParser from "cookie-parser";
import userRoute from "./routes/user.routes.js";
import cors from "cors";
import courseRoute from "./routes/course.routes.js";
import paymentRoute from "./routes/payment.routes.js";
import chatRoute from "./routes/chat.routes.js";
import lectureRoute from "./routes/lecture.routes.js";

const app = express();

app.use(express.json());
const allowedOrigin = [
  "https://techedu26.netlify.app",
  "http://localhost:5173",
];
app.use(
  cors({
    origin: allowedOrigin,
    methods: ["GET", "POST", "PUT"],
    credentials: true,
  })
);
app.use(cookieParser());

app.use("/api/v1/user/", userRoute);
app.use("/api/v1/course/", courseRoute);
app.use("/api/v1/payment/", paymentRoute);
app.use("/api/v1/techedu-ai", chatRoute);

app.use("/api/v1/course", lectureRoute);

export default app;
