import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api.v1";

const AddLectureTemp = () => {
  const { courseId } = useParams();

  const [course, setCourse] = useState(null);
  const [moduleTitle, setModuleTitle] = useState("");
  const [selectedModuleId, setSelectedModuleId] = useState("");
  const [lecture, setLecture] = useState({
    title: "",
    description: "",
    // type: "recorded",
    thumbnail: null,
    video: null,
    duration: null,
  });

  /* ================= FETCH COURSE ================= */
  useEffect(() => {
    const fetchCourse = async () => {
      const res = await api.get(`/teacher/course/${courseId}`, {
        withCredentials: true,
      });
      setCourse(res.data.course);
    };
    fetchCourse();
  }, [courseId]);

  /* ================= ADD MODULE ================= */
  const addModule = async () => {
    if (!moduleTitle) return;

    const res = await api.post(
      `/teacher/course/${courseId}/module`,
      { moduleTitle },
      { withCredentials: true }
    );

    setCourse({ ...course, syllabus: res.data.syllabus });
    setModuleTitle("");
  };

  /* ================= ADD LECTURE ================= */
  const addLecture = async () => {
    if (!selectedModuleId) {
      alert("Select module first");
      return;
    }

    const formData = new FormData();
    formData.append("title", lecture.title);
    formData.append("description", lecture.description);
    formData.append("type", lecture.type);

    if (lecture.type === "recorded") {
      formData.append("video", lecture.video);
    }

    const res = await api.post(
      `/teacher/course/${courseId}/module/${selectedModuleId}/lecture`,
      formData,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    setCourse({ ...course, syllabus: res.data.syllabus });

    setLecture({
      title: "",
      description: "",
      type: "recorded",
      video: null,
    });
  };

  if (!course) return <p>Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{course.title} – Content</h1>

      {/* ================= ADD MODULE ================= */}
      <div className="bg-white p-6 rounded-xl shadow mb-6">
        <h2 className="font-semibold mb-3">Add Module</h2>

        <div className="flex gap-4">
          <input
            value={moduleTitle}
            onChange={(e) => setModuleTitle(e.target.value)}
            placeholder="Module title"
            className="flex-1 border px-4 py-2 rounded-lg"
          />
          <button
            onClick={addModule}
            className="bg-green-600 text-white px-6 rounded-lg"
          >
            Add
          </button>
        </div>
      </div>

      {/* ================= DISPLAY SYLLABUS ================= */}
      {course.syllabus.map((mod) => (
        <div key={mod._id} className="bg-white rounded-xl p-6 mb-4">
          <h3 className="font-semibold mb-2">{mod.moduleTitle}</h3>

          {mod.lectures.map((lec, i) => (
            <p key={i} className="text-sm text-gray-600">
              • {lec.title} ({lec.type})
            </p>
          ))}
        </div>
      ))}
    </div>
  );
};

export default AddLectureTemp;
