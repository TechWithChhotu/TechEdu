import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import LectureSidebar from "./LectureSidebar";
import VideoPlayer from "./VideoPlayer";
import LectureTabs from "./LectureTabs";
import api from "../../services/api.v1";

export default function WatchLecture() {
  const { courseId } = useParams();
  const courses = useSelector((state) => state.userSlice.courses);

  // const courseData = courses?.find((c) => c._id === courseId);
  const [courseData, setCourseData] = useState(null);
  useEffect(() => {
    const getcoursebyid = async () => {
      const data = await api.get(`course/${courseId}`);
      setCourseData(data.data.course);
      console.log("data=> ", data.data.course);
    };
    getcoursebyid();
  }, []);
  // 🔑 selected lecture state
  const [activeLecture, setActiveLecture] = useState(null);

  // default → first lecture
  useEffect(() => {
    if (courseData?.lectures?.length) {
      setActiveLecture(courseData.lectures[0]);
    }
  }, [courseData]);

  console.log("course ==> ", courseData);

  if (!courseData) return <p>Course not found</p>;

  return (
    <div className="h-screen">
      <h2 className="text-center text-green-500 bg-black font-bold font-mono">
        {courseData?.title}
      </h2>
      <div className="flex  bg-slate-100">
        {/* Left Sidebar */}
        <LectureSidebar
          lectures={courseData.lectures}
          activeLecture={activeLecture}
          onSelect={setActiveLecture}
        />

        {/* Right Content */}
        <div className="flex-1 flex flex-col">
          <VideoPlayer lecture={activeLecture} />
          <LectureTabs lecture={activeLecture} />
        </div>
      </div>
    </div>
  );
}

// import LectureSidebar from "./LectureSidebar";
// import VideoPlayer from "./VideoPlayer";
// import LectureTabs from "./LectureTabs";
// import { useSelector } from "react-redux";
// import { useEffect, useState } from "react";
// import { data, useParams } from "react-router-dom";
// import api from "../../services/api.v1.js";
// const WatchLecture = () => {
//   const { courseId } = useParams();

//   const reduxCourseData = useSelector((state) => state.userSlice?.courses);
//   const [courseData, setCourseData] = useState(null);
//   // Load data from redux

//   const courses = useSelector((state) => state.userSlice.courses);

//   const course = courses?.find((c) => c._id === courseId);

//   console.log("Selected course(19):", course);
//   console.log("Lectures:", course?.lectures);

//   // useEffect(() => {
//   //   console.log("courses ==> ");
//   //   console.log(reduxCourseData);

//   //   if (reduxCourseData) {
//   //     const selectedCourse = reduxCourseData?.find(
//   //       (course) => course._id === courseId
//   //     );

//   //     setCourseData(selectedCourse);
//   //     console.log("selectedCourse => ");
//   //     console.log(selectedCourse);
//   //   }
//   // }, [reduxCourseData]);

//   useEffect(() => {
//     const getcoursebyid = async () => {
//       const data = await api.get(`course/${courseId}`);
//       setCourseData(data.data.course);
//       console.log("data=> ", data.data.course);
//     };
//     getcoursebyid();
//   }, []);
//   console.log("course ==> ");
//   console.log(courseData);
//   return (
//     <section className="h-screen flex flex-col bg-slate-100">
//       {/* Header */}
//       <div className="bg-white shadow px-6 py-4">
//         <h1 className="text-xl font-bold text-slate-800">
//           {courseData?.title}
//         </h1>

//         {/* Progress */}
//         <div className="mt-2 h-2 bg-slate-200 rounded-full">
//           <div className="h-2 w-[35%] bg-indigo-600 rounded-full"></div>
//         </div>
//         <p className="text-xs mt-1 text-slate-500">35% Completed</p>
//       </div>

//       {/* Content */}
//       <div className="flex flex-1 overflow-hidden">
//         {/* Left Sidebar */}
//         <LectureSidebar lectures={courseData.lectures} key={courseId} />

//         {/* Main Area */}
//         <div className="flex-1 flex flex-col">
//           <VideoPlayer />
//           <LectureTabs />
//         </div>
//       </div>
//     </section>
//   );
// };

// export default WatchLecture;
