import mongoose from "mongoose";

const lectureSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    default:
      "https://th.bing.com/th/id/OIP.PK7cvUTwXYCH2CHvcMJjQgHaEK?w=249&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7",
    required: [true, "Thumbnail of the course is required"],
  },
  video: {
    type: String,
    default:
      "https://th.bing.com/th/id/OIP.PK7cvUTwXYCH2CHvcMJjQgHaEK?w=249&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7",
  },
  duration: {
    type: Number, // minutes
    default: 0,
  },
});

const syllabusSchema = new mongoose.Schema({
  moduleTitle: {
    type: String,
    required: true,
  },
  moduleDescription: {
    type: String,
  },
  lectures: [lectureSchema],
});

const courseSchema = new mongoose.Schema(
  {
    /* ================= Category ================= */
    category: {
      type: String,
      enum: [
        "Web Development",
        "App Development",
        "Data Science & AI",
        "Cyber Security",
        "Cloud & DevOps",
        "Finance & Accounting",
        "Stock Market & Trading",
        "Digital Marketing",
        "UI/UX Design",
        "Vocational & Skill Training",
      ],
      required: true,
    },

    /* ================= Basic Info ================= */
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    thumbnail: {
      type: String,
      default:
        "https://th.bing.com/th/id/OIP.PK7cvUTwXYCH2CHvcMJjQgHaEK?w=249&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7",
      required: [true, "Thumbnail of the course is required"],
    },
    Introductionlecture: {
      type: String,
      default:
        "https://www.pexels.com/video/a-group-of-young-people-in-discussion-of-a-group-project-3209298/",
    },

    createdBy: {
      type: String,
      required: true,
    },

    /* ================= Pricing ================= */
    price: {
      type: Number,
      required: true,
    },

    discount: {
      type: Number,
      default: 0,
    },

    /* ================= Course Meta ================= */
    courseDuration: {
      type: String, // e.g. "6 Months", "12 Weeks"
      required: true,
    },

    accessDuration: {
      type: String, // e.g. "Lifetime", "1 Year"
      default: "Lifetime",
    },

    level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      default: "Beginner",
    },

    language: {
      type: String,
      default: "English",
    },

    certificateAvailable: {
      type: Boolean,
      default: true,
    },

    /* ================= Learning Info ================= */
    prerequisites: [
      {
        type: String,
      },
    ],

    learningOutcomes: [
      {
        type: String,
      },
    ],

    /* ================= Syllabus ================= */
    syllabus: [syllabusSchema],

    numberOfLectures: {
      type: Number,
      default: 0,
    },

    /* ================= Stats ================= */
    enrolledStudents: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        order: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Order",
          required: true,
        },
        enrolledAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    rating: {
      type: Number,
      default: 5,
    },

    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Course = mongoose.model("Course", courseSchema);
export default Course;

// import mongoose from "mongoose";

// const courseSchema = new mongoose.Schema(
//   {
//     category: {
//       type: String,
//       enum: [
//         "Web Development",
//         "App Development",
//         "Data Science & AI",
//         "Cyber Security",
//         "Cloud & DevOps",
//         "Finance & Accounting",
//         "Stock Market & Trading",
//         "Digital Marketing",
//         "UI/UX Design",
//         "Vocational & Skill Training",
//       ],
//       default: "Web Development", // after testing remove this
//       required: [true, "Course category is required"],
//     },
//     syllbus: {
//       type: String,
//     },

//     thumbnail: {
//       type: String,
//       default:
//         "https://th.bing.com/th/id/OIP.PK7cvUTwXYCH2CHvcMJjQgHaEK?w=249&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7",
//       required: [true, "Thumbnail of the course is required"],
//     },
//     description: {
//       type: String,
//       required: [true, "Description is required"],
//     },
//     title: {
//       type: String,
//       required: [true, "Title is required"],
//     },
//     Introductionlecture: {
//       type: String,
//       default:
//         "https://www.pexels.com/video/a-group-of-young-people-in-discussion-of-a-group-project-3209298/",
//     },
//     createdBy: {
//       type: String,
//       required: [true, "Instructor Name is required"],
//     },
//     price: {
//       type: Number,
//       required: [true, "Price is required"],
//     },

//     discount: {
//       type: Number,
//       default: 100,
//     },
//     numberOfLectures: {
//       type: Number,
//       default: 0,
//     },
//     lectures: [
//       {
//         title: {
//           type: String,
//           required: [true, "Title is required"],
//         },
//         description: {
//           type: String,
//           required: [true, "Description is required"],
//         },
//         // thumbnail: {
//         //   type: String,
//         //   default:
//         //     "https://th.bing.com/th/id/OIP.PK7cvUTwXYCH2CHvcMJjQgHaEK?w=249&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7",
//         //   required: [true, "Thumbnail of the course is required"],
//         // },
//         video: {
//           type: String,
//           default:
//             "https://th.bing.com/th/id/OIP.PK7cvUTwXYCH2CHvcMJjQgHaEK?w=249&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7",
//         },
//       },
//     ],
//   },
//   { timestamps: true }
// );

// const Course = mongoose.model("Course", courseSchema);
// export default Course;
