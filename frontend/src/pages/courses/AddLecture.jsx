import { X, Pencil, Trash2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import api from "../../services/api.v1.js";
import { setUserData } from "../../stores/user.slice.js";
import AddLectureTemp from "./AddLectureTemp.jsx";

export default function AddLecture() {
  const navigate = useNavigate();
  const { courseId } = useParams();
  console.log("====================================");
  console.log("CourseId: ", courseId);
  console.log("====================================");
  const dispatch = useDispatch();

  // ==============Local states=============
  const [lecture, setLecture] = useState({
    title: "",
    description: "",
    type: "",
    moduleTitle: "",
    thumbnail: null,
    video: null,
    duration: null,
  });

  const handleAddLecture = async () => {
    try {
      const formData = new FormData();

      formData.append("title", lecture.title);
      formData.append("description", lecture.description);
      formData.append("type", lecture.type);

      if (lecture.type === "recorded") {
        formData.append("video", lecture.video); // 👈 same key as multer
      }

      const res = await api.post(`/course/addlecture/${courseId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Lecture added:", res.data);
      setLecture({
        title: "",
        description: "",
        type: "",
        moduleTitle: "",
        thumbnail: null,
        video: null,
        duration: null,
      });
      alert("Lecture added successfully");
      navigate(-1);
    } catch (err) {
      console.error(err);
      alert("Something went wrong:");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="relative bg-white rounded-2xl w-full max-w-3xl p-8 shadow-xl">
        {/* Close */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
        >
          <X size={26} />
        </button>
        {/* ================= ADD LECTURE ================= */}
        <section>
          <div className="bg-white p-6 rounded-xl shadow mb-6">
            <h2 className="font-semibold mb-4">Add Lecture</h2>

            {/* Syllabus */}
            {/* <select
              className="w-full border px-4 py-2 rounded-lg mb-3"
              value={selectedModuleId}
              onChange={(e) => setSelectedModuleId(e.target.value)}
            >
              <option value="">Select Module</option>
              {course.syllabus.map((m) => (
                <option key={m._id} value={m._id}>
                  {m.moduleTitle}
                </option>
              ))}
            </select> */}

            <input
              className="w-full border px-4 py-2 rounded-lg mb-3"
              placeholder="Lecture title"
              value={lecture.title}
              onChange={(e) =>
                setLecture({ ...lecture, title: e.target.value })
              }
            />

            <textarea
              className="w-full border px-4 py-2 rounded-lg mb-3"
              placeholder="Lecture description"
              value={lecture.description}
              onChange={(e) =>
                setLecture({ ...lecture, description: e.target.value })
              }
            />

            <select
              className="w-full border px-4 py-2 rounded-lg mb-3"
              value={lecture.type}
              onChange={(e) => setLecture({ ...lecture, type: e.target.value })}
            >
              <option value="null">Select lecture type</option>

              <option value="recorded">Recorded Lecture</option>
              <option value="live">Live Class</option>
            </select>

            {lecture.type === "recorded" && (
              <input
                type="file"
                accept="video/*"
                onChange={(e) =>
                  setLecture({ ...lecture, video: e.target.files[0] })
                }
                className="mb-4"
              />
            )}

            <button
              onClick={handleAddLecture}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg"
            >
              Add Lecture
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
