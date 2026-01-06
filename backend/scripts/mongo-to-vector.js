// import { getCollection } from "../services/chroma.js";
// import { createEmbedding } from "../services/embed.js";
import { createEmbedding } from "../services/embed.js";
import { getCollection } from "../services/chroma.js";
import Course from "../models/courses.models.js";

// async function run() {
//   const collection = await getCollection();

//   const courses = await Course.find();

//   for (const course of courses) {
//     const text = `
//       Course Title: ${course.title}
//       Description: ${course.description}
//     `;

//     const embedding = await createEmbedding(text);

//     await collection.add({
//       ids: [course._id.toString()],
//       documents: [text],
//       embeddings: [embedding], // 🔥 REQUIRED
//       metadatas: [{ type: "course" }],
//     });

//     console.log("Added:", course.title);
//   }

//   process.exit(0);
// }

// run();
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

async function run() {
  try {
    // 🔥 1️⃣ CONNECT MONGO
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");

    // 🔥 2️⃣ GET CHROMA COLLECTION
    const collection = await getCollection();

    // 🔥 3️⃣ FETCH DATA
    const courses = await Course.find();
    console.log(`Found ${courses.length} courses`);

    for (const course of courses) {
      const text = `
Course Title: ${course.title}
Description: ${course.description}
price:${course.price}
educator:${course.createdBy}
`;
      // botResponses = {
      //       // Greetings
      //       hello: "Hi 👋 Welcome to TechEdu! How can I help you today?",
      //       hi: "Hello! I’m TechEdu AI Assistant. What would you like to learn?",
      //       hey: "Hey 👋 Ask me anything about TechEdu courses and learning.",

      //       // About TechEdu
      //       "what is techedu":
      //         "TechEdu is an online E-Learning platform that provides industry-focused courses in technology, programming, and professional skills.",
      //       "about techedu":
      //         "TechEdu is built to help students learn practical skills through structured courses, lectures, and hands-on projects.",
      //       "who created techedu":
      //         "TechEdu is developed as a modern MERN-stack based E-Learning platform focused on quality education.",

      //       // TechEdu AI
      //       "who are you":
      //         "I am TechEdu AI, trained on TechEdu’s own learning content to help students.",
      //       "are you chatgpt":
      //         "No. I am TechEdu AI, trained only on TechEdu data to guide learners accurately.",
      //       "what can you do":
      //         "I can help you with TechEdu courses, lectures, platform usage, and learning guidance.",

      //       // Courses
      //       "what courses are available":
      //         "TechEdu offers technology-focused courses such as Web Development, App Development, Data Science, AI, and more.",
      //       "web development course":
      //         "The Web Development course covers HTML, CSS, JavaScript, React, Node.js, Express, and MongoDB.",
      //       "mern stack":
      //         "MERN stack includes MongoDB, Express, React, and Node.js. TechEdu provides structured MERN stack learning.",

      //       // Learning & Lectures
      //       "how lectures work":
      //         "Each course in TechEdu is divided into structured lectures with video content and learning materials.",
      //       "can i watch lectures anytime":
      //         "Yes, once enrolled, you can watch TechEdu lectures anytime based on your access duration.",
      //       "lifetime access":
      //         "Some TechEdu courses provide lifetime access to learning content.",

      //       // Account & Platform
      //       "how to create account":
      //         "You can create a TechEdu account by signing up with your email and password.",
      //       "login issue":
      //         "If you face login issues, please check your credentials or try refreshing the page.",
      //       "is login required":
      //         "Yes, login is required to access enrolled courses on TechEdu.",

      //       // Payments (generic – safe for early stage)
      //       "is techedu free":
      //         "Some content may be free, while premium courses require enrollment.",
      //       "payment methods":
      //         "TechEdu supports secure payment methods for course enrollment.",
      //       "is payment safe":
      //         "Yes, TechEdu uses secure and trusted payment systems.",

      //       // Certificates & Progress
      //       "do i get certificate":
      //         "Certificates may be provided after successfully completing certain TechEdu courses.",
      //       "track progress":
      //         "TechEdu allows students to track their course progress lecture by lecture.",

      //       // Help & Support
      //       "need help": "Sure! Tell me what you need help with on TechEdu.",
      //       "contact support":
      //         "For further help, please contact TechEdu support through the platform.",
      //       "report issue":
      //         "You can report issues directly from your TechEdu dashboard.",

      //       // Rules / Boundaries
      //       "ask outside techedu":
      //         "I can only answer questions related to TechEdu and its learning content.",
      //       "unknown question": "I couldn’t find this information in TechEdu yet.",

      //       // Friendly
      //       "can we become friends":
      //         "Yes 😊 I’m here to support you throughout your learning journey at TechEdu!",
      //       "thank you": "You’re welcome! Happy learning with TechEdu 🚀",
      //       bye: "Goodbye 👋 Keep learning with TechEdu!",

      //       hello: "Hi 👋 Welcome to TechEdu! How can I help you today?",
      //       hi: "Hello! I’m TechEdu AI Assistant.",
      //       hey: "Hey 👋 Ask me anything about TechEdu.",
      //       "thank you": "You’re welcome 😊 Happy learning with TechEdu!",
      //       bye: "Goodbye 👋 Keep learning with TechEdu 🚀",

      //       /* ================== About TechEdu ================== */
      //       "what is techedu":
      //         "TechEdu is a MERN-stack based E-Learning platform offering structured technology courses.",
      //       "about techedu":
      //         "TechEdu helps students learn practical tech skills through courses, lectures, and projects.",
      //       "who are you":
      //         "I am TechEdu AI, trained to help you navigate and learn on the TechEdu platform.",

      //       /* ================== Authentication ================== */
      //       "where is login page":
      //         "You can login or sign up on TechEdu from the Auth page at route: /auth",
      //       "how to login":
      //         "Go to the /auth page and login using your registered email and password.",
      //       "signup page": "You can create a new account on the /auth page.",
      //       "is login required":
      //         "Yes, login is required to access your profile, courses, and lectures.",
      //       "profile page": "You can edit your profile at route: /profile",

      //       /* ================== Public Pages ================== */
      //       "home page": "The home page of TechEdu is available at route: /",
      //       "about page":
      //         "You can learn more about TechEdu on the About page at route: /about",
      //       "contact page":
      //         "You can contact TechEdu using the Contact page at route: /contact",

      //       /* ================== Courses ================== */
      //       "where are courses":
      //         "All available courses are listed on the Courses page at route: /courses",
      //       "course details":
      //         "Each course has a details page available at route: /courses/:id",
      //       "my courses": "You can see your enrolled courses at route: /my-courses",
      //       "watch course": "To watch course lectures, go to /my-courses/:courseId",

      //       /* ================== Lectures ================== */
      //       "how to watch lecture":
      //         "After enrolling, you can watch lectures from the Watch Lecture page.",
      //       "watch lecture page":
      //         "Lecture videos are available at route: /my-courses/:courseId",
      //       "lecture content":
      //         "Each course lecture is organized inside the course watch page.",

      //       /* ================== Checkout & Payment ================== */
      //       "how to buy course":
      //         "To purchase a course, open the course details page and proceed to checkout.",
      //       "checkout page":
      //         "The checkout page for a course is available at route: /checkout/:id",
      //       "is payment safe":
      //         "Yes, TechEdu uses secure payment integration for course purchases.",

      //       /* ================== Admin Panel ================== */
      //       "admin dashboard":
      //         "Admin dashboard is available at route: /admin/dashboard",
      //       "admin users": "Admins can manage users from route: /admin/users",
      //       "create course":
      //         "Admins can create new courses from route: /admin/create-course",
      //       "admin orders": "Admins can manage orders from route: /admin/orders",
      //       "who is admin": "Admins manage courses, users, and orders on TechEdu.",

      //       /* ================== Employee Panel ================== */
      //       "employee dashboard":
      //         "Employee dashboard is available at route: /emp/dashboard",
      //       "employee courses":
      //         "Employees can view assigned courses at route: /emp/courses",
      //       "add lecture":
      //         "Employees can add lectures using route: /emp/add-lecture/:courseId",
      //       "course content":
      //         "Employees can manage course content at route: /emp/course/:courseId/content",

      //       /* ================== Technical / Platform Info ================== */
      //       "what tech stack used":
      //         "TechEdu is built using MERN stack (MongoDB, Express, React, Node.js).",
      //       "frontend port": "TechEdu frontend runs on PORT 3000 by default.",
      //       "backend database":
      //         "TechEdu uses MongoDB for storing users, courses, and lectures.",

      //       /* ================== Environment Variables ================== */
      //       "what is jwt secret":
      //         "JWT_SECRET is used to securely sign and verify authentication tokens.",
      //       "what is mongo uri":
      //         "MONGO_URI is used to connect the backend to the MongoDB database.",
      //       "why twilio used": "Twilio is used for OTP or phone-based communication.",
      //       "why cloudinary used":
      //         "Cloudinary is used to upload and manage images and videos.",
      //       "razorpay keys": "Razorpay keys are used for secure payment processing.",

      //       /* ================== Help & Fallback ================== */
      //       "need help": "Sure 😊 Tell me what you need help with on TechEdu.",
      //       unknown: "I couldn’t find this information in TechEdu yet.",
      //       "outside question":
      //         "I can only answer questions related to the TechEdu platform.",
      //     };
      // text +=
      const embedding = await createEmbedding(text);

      await collection.add({
        ids: [course._id.toString()],
        documents: [text],
        embeddings: [embedding], // 🔥 REQUIRED
        metadatas: [{ type: "course" }],
      });

      console.log("Added:", course.title);
    }

    console.log("✅ Mongo → Chroma sync complete");
    process.exit(0);
  } catch (err) {
    console.error("❌ mongo-to-vector error:", err.message);
    process.exit(1);
  }
}

run();
