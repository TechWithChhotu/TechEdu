// import { useState } from "react";

// const tabs = ["Overview", "Notes", "Doubts", "Assignment"];

// const LectureTabs = () => {
//   const [activeTab, setActiveTab] = useState("Overview");

//   return (
//     <div className="bg-white flex-1 p-6">
//       {/* Tabs */}
//       <div className="flex gap-6 border-b mb-4">
//         {tabs.map((tab) => (
//           <button
//             key={tab}
//             onClick={() => setActiveTab(tab)}
//             className={`pb-2 font-medium ${
//               activeTab === tab
//                 ? "text-indigo-600 border-b-2 border-indigo-600"
//                 : "text-slate-500"
//             }`}
//           >
//             {tab}
//           </button>
//         ))}
//       </div>

//       {/* Content */}
//       {activeTab === "Overview" && (
//         <p className="text-slate-700">
//           In this lecture, you will learn core fundamentals with real-world
//           examples.
//         </p>
//       )}

//       {activeTab === "Notes" && (
//         <p className="text-slate-700">
//           Download lecture notes & code snippets here.
//         </p>
//       )}

//       {activeTab === "Doubts" && (
//         <p className="text-slate-700">
//           Ask your doubts & get answers from mentors.
//         </p>
//       )}

//       {activeTab === "Assignment" && (
//         <p className="text-slate-700">
//           Assignment will unlock after completing the lecture.
//         </p>
//       )}
//     </div>
//   );
// };

// export default LectureTabs;
import { useState } from "react";
import { Tabs, Tab, Box } from "@mui/material";
// import LectureComments from "./LectureComments";
import LectureComments from "../../components/courses/LectureComments.jsx";
import LectureResources from "../../components/lecture/LectureResources.jsx";

export default function LectureTabs({ lecture }) {
  const [tab, setTab] = useState("overview");
  const lectureId = lecture?._id;
  console.log("lecture==> ");
  console.log(lecture);

  if (!lecture) return null;

  return (
    <div className="bg-white p-6 flex-1">
      {/* Tabs */}
      <div className="flex gap-6 border-b mb-4">
        {["overview", "resources", "comments"].map((t) => (
          <tabs
            key={t}
            onClick={() => setTab(t)}
            className={`pb-2 ${
              tab === t
                ? "border-b-2 border-indigo-600 text-indigo-600"
                : "text-gray-500"
            }`}
          >
            {t.toUpperCase()}
          </tabs>
        ))}
      </div>

      {/* Content */}
      {tab === "overview" && (
        <p className="text-gray-700">{lecture.description}</p>
      )}

      {tab === "resources" && (
        <div className="text-gray-500">
          {console.log("current lecture ==> ", lecture.resources)}
          <LectureResources resources={lecture.resources} />
        </div>
      )}

      {tab === "comments" && (
        <div className="text-gray-500">
          {<LectureComments lectureId={lectureId} />}
        </div>
      )}
    </div>
  );
}
