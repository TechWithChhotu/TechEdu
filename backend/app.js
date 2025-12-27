import express from "express";
import cookieParser from "cookie-parser";
import userRoute from "./routes/user.routes.js";
import cors from "cors";
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

export default app;
