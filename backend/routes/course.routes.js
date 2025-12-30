import { Router } from "express";
import {
  getAllCourses,
  getLecturesByCourseId,
  createCourse,
  updateCourse,
  removeCourse,
  addLectureaByCourseId,
  getCourseById,
  getLectureByCourseIdAndLectureId,
  addLecture,
} from "../controllers/course.controllers.js";
import upload from "../middlewares/multer.middleware.js";
import authorizedRoles from "../middlewares/roles.middlewares.js";
import isLoggedIn from "../middlewares/isAuthenticated.js";

const courseRoute = new Router();

courseRoute.get("/", getAllCourses);

courseRoute.get(
  "/lecture/:courseId/:lectureId",
  getLectureByCourseIdAndLectureId
);
courseRoute.get("/lectures/:courseId", getLecturesByCourseId);

courseRoute.get("/:id", getCourseById);

courseRoute.post(
  "/create-course",
  isLoggedIn,
  authorizedRoles("ADMIN"),
  upload.single("thumbnail"),
  createCourse
);

courseRoute.post(
  "/",
  isLoggedIn,
  authorizedRoles("ADMIN"),
  upload.single("thumbnail"),
  createCourse
);

courseRoute.post(
  "/:id",
  isLoggedIn,
  authorizedRoles("ADMIN"),
  upload.single("video"),
  addLectureaByCourseId
);

courseRoute.put("/:id", isLoggedIn, authorizedRoles("ADMIN"), updateCourse);

courseRoute.delete("/:id", isLoggedIn, authorizedRoles("ADMIN"), removeCourse);
// TEST ============
// courseRoute.post("/course/:courseId/module", isLoggedIn, isTeacher, addModule);
courseRoute.post(
  "/addlecture/:courseId",
  isLoggedIn,
  // isTeacher,
  upload.single("video"),
  addLecture
);

// courseRoute.post(
//   "/course/:courseId/live-class",
//   isLoggedIn,
//   isTeacher,
//   startLiveClass
// );

export default courseRoute;
