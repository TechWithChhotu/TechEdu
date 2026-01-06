import Course from "../models/courses.models.js";
/* ===============================
   ADD RESOURCE
================================ */

/**
 * Add Resource to a Lecture
 */
export const addLectureResource = async (req, res) => {
  console.log("AddLecture Resources called");
  try {
    const { courseId, lectureId } = req.params;
    const { title, type, url } = req.body;

    // 🔍 Validation
    if (!title || !url) {
      return res.status(400).json({
        message: "Title and URL are required",
      });
    }

    // 🔎 Find course
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    // 🔎 Find lecture
    const lecture = course.lectures.id(lectureId);
    if (!lecture) {
      return res.status(404).json({
        message: "Lecture not found",
      });
    }

    console.log("Test22222222");
    // ➕ Add resource
    lecture.resources.push({
      title,
      type: type || "other",
      url,
    });
    console.log("TEST33333333333");

    await course.save(); // ✅ safe here
    console.log("Test4444444444");

    return res.status(201).json({
      message: "Resource added successfully",
      resources: lecture.resources,
    });
  } catch (error) {
    console.error("Add resource error:", error);
    res.status(500).json({
      message: "Server error",
    });
  }
};

/* ===============================
   ADD COMMENT
================================ */
// controllers/lecture.controller.js
// import Course from "../models/course.model.js";

export const addLectureComment = async (req, res) => {
  try {
    const { courseId, lectureId } = req.params;
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ message: "Comment is required" });
    }

    const updatedCourse = await Course.findOneAndUpdate(
      {
        _id: courseId,
        "lectures._id": lectureId,
      },
      {
        $push: {
          "lectures.$.comments": {
            user: req.user._id, // 🔥 REQUIRED
            message,
          },
        },
      },
      { new: true }
    );

    if (!updatedCourse) {
      return res.status(404).json({ message: "Lecture not found" });
    }

    res.status(201).json({
      message: "Comment added successfully",
      comments: updatedCourse.lectures.find(
        (lec) => lec._id.toString() === lectureId
      ).comments,
    });
  } catch (error) {
    console.error("Add comment error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* ===============================
   GET COMMENTS
================================ */
export const getLectureComments = async (req, res) => {
  try {
    const { courseId, lectureId } = req.params;
    const userId = req.user.id;
    console.log("userId ==> ", userId);

    const course = await Course.findById(courseId).populate(
      "lectures.comments.user",
      "name avatar"
    );

    if (!course) return res.status(404).json({ message: "Course not found" });

    const lecture = course.lectures.id(lectureId);
    if (!lecture) return res.status(404).json({ message: "Lecture not found" });

    res.json({
      success: true,
      comments: lecture.comments,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
