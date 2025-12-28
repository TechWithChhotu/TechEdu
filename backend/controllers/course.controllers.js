import Course from "../models/courses.models.js";
import fs from "fs/promises";
import { v2 } from "cloudinary";
import cloudinary from "cloudinary";

/*======================Delete Lecture======================*/

/*======================update Lecture======================*/

/*======================addLectureaByCourseId======================*/
const addLectureaByCourseId = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const { id } = req.params;

    const course = await Course.findById(id);

    const lecturePath = req.file.path;

    if (req.file) {
      try {
        cloudinary.uploader.upload_large(
          lecturePath,
          function (result) {
            const lecture = {
              title,
              description,
              video: result.secure_url,
            };

            // Push the new lecture into the lectures array
            course.lectures.push(lecture);

            // Update the numberOfLectures field
            course.numberOfLectures = course.lectures.length;

            course.save();
          },
          { resource_type: "video" }
        );
      } catch (err) {
        return res.status(400).json({
          success: false,
          message: `file not uploaded please try again, ERROR: ${err.message}`,
        });
      }
    }

    res.status(201).json({
      success: true,
      message: "Lecture uploaded successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

/*======================getAllCourses======================*/
const getAllCourses = async (req, res, next) => {
  try {
    const courses = await Course.find({}).select("-lectures");
    res.status(200).json({
      success: true,
      message: "All courses",
      courses,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: `ERROR: ${err.message}`,
    });
  }
};

/*======================getCourseById======================*/
const getCourseById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const course = await Course.findById(id);

    if (!course) {
      return res.status(400).json({
        success: false,
        message: "Course does not exist",
        course,
      });
    }

    res.status(200).json({
      success: true,
      message: "Course fetched successfully",
      course,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: `ERROR: ${err.message}`,
    });
  }
};

/*======================getLecturesByCourseId======================*/
const getLecturesByCourseId = async (req, res, next) => {
  try {
    const { courseId } = req.params;

    const course = await Course.findById(courseId);

    if (course) {
      const foundLecture = course.lectures;
      return res.status(200).json({
        success: true,
        message: "All Lectures",
        lecture: foundLecture,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Lectures not found in the course.",
      });
    }
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: `ERROR: ${err.message}`,
    });
  }
};

/*======================getLecturesByCourseId======================*/
const getLectureByCourseIdAndLectureId = async (req, res, next) => {
  try {
    const { courseId, lectureId } = req.params;

    const course = await Course.findOne(
      { _id: courseId, "lectures._id": lectureId },
      { "lectures.$": 1 }
    );

    if (course) {
      const foundLecture = course.lectures[0];
      return res.status(200).json({
        success: true,
        message: "Lecture found in course",
        lecture: foundLecture,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Lecture not found in the course.",
      });
    }
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: `ERROR: ${err.message}`,
    });
  }
};

/*======================createCourse======================*/
const createCourse = async (req, res, next) => {
  const {
    title,
    description,
    category,
    createdBy,
    price,
    courseDuration,
    accessDuration,
    level,
    language,
    discount,
    prerequisites,
    learningOutcomes,
  } = req.body;

  if (!title || !description || !category || !createdBy) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  const course = await Course.create({
    title,
    description,
    category,
    createdBy,
    price,
    courseDuration,
    accessDuration,
    level,
    language,
    discount,
    prerequisites,
    learningOutcomes,
  });

  if (!course) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong, Course could not be created",
    });
  }

  if (req.file) {
    try {
      const result = await v2.uploader.upload(req.file.path, {
        folder: "TechEdu/Courses", // Save files in a folder named lms
        width: 1500,
        height: 768,
      });

      if (result) {
        //user.avatar = result.public_id;
        course.thumbnail = result.secure_url;

        // remove file from local server
        fs.rm(`uploads/${req.file.filename}`);
      }
      await course.save();

      res.status(200).json({
        success: true,
        message: "Course created successfully",
        course,
      });
    } catch (err) {
      res.status(400).json({
        success: false,
        message: `file not uploaded please try again, ERROR: ${err}`,
      });
    }
  }
  // ****************--> file upload end*********************
};

/*======================updateCourse======================*/
const updateCourse = async (req, res, next) => {
  try {
    const { id } = req.params;

    // const course = await Course.findById({ id });
    const course = await Course.findByIdAndUpdate(
      id,
      { $set: req.body },
      { runValidators: true }
    );

    if (!course) {
      return res.status(400).json({
        success: false,
        message: "Course does not exist",
      });
    }

    res.status(200).json({
      success: true,
      message: "Course updated successfully",
      course,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: `file not uploaded please try again, ERROR: ${err.message}`,
    });
  }
};

/*======================removeCourse======================*/
const removeCourse = async (req, res, next) => {
  try {
    const { id } = req.body;
    const course = await Course.findOneAndDelete({ id });

    if (!course) {
      return res.status(400).json({
        success: false,
        message: "Course does not exist",
        course,
      });
    }
    return res.status(201).json({
      success: true,
      message: "Course deleted successfully",
      course,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: `file not uploaded please try again, ERROR: ${err.message}`,
    });
  }
};

export {
  getAllCourses,
  getLecturesByCourseId,
  getLectureByCourseIdAndLectureId,
  createCourse,
  updateCourse,
  removeCourse,
  getCourseById,
  addLectureaByCourseId,
};
