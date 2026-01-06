import express from "express";
import {
  addLectureComment,
  addLectureResource,
  getLectureComments,
} from "../controllers/lecture.controller.js";
import isLoggedIn from "../middlewares/isAuthenticated.js";

const lectureRoute = express.Router();

lectureRoute.post("/:courseId/lecture/:lectureId/resource", addLectureResource);
lectureRoute.post(
  "/:courseId/lecture/:lectureId/comment",
  isLoggedIn,
  addLectureComment
);
lectureRoute.get(
  "/:courseId/lecture/:lectureId/comments",
  isLoggedIn,
  getLectureComments
);

export default lectureRoute;
