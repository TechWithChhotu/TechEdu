import { useEffect, useState } from "react";
import api from "../../services/api.v1";
import MyCourseCard from "./MyCourseCard";
import AddLectureModal from "./AddLecture";
import { Link } from "react-router-dom";

const CourseLecture = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeModuleId, setActiveModuleId] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const fetchCourse = async () => {
    try {
      const res = await api.get(`/teacher/course/${courseId}`, {
        withCredentials: true,
      });
      setCourses(res.data.course);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchMyCourses = async () => {
      try {
        const res = await api.get("/user/my-courses", {
          withCredentials: true,
        });
        setCourses(res.data.courses);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMyCourses();
  }, []);

  if (loading) return <p>Loading your courses...</p>;
  if (courses.length === 0)
    return <p>You have not enrolled in any course yet.</p>;

  return (
    <>
      <section className="min-h-screen p-6 bg-slate-50">
        <h1 className="text-2xl font-bold mb-6">My Courses</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Link
              key={course._id}
              onClick={() => {
                setSelectedCourse(course);
                setIsModalOpen(true);
              }}
              to={`${course._id}`}
              className="cursor-pointer"
            >
              <MyCourseCard course={course} />
            </Link>
          ))}
        </div>
        <button
          onClick={() => {
            // setActiveModuleId(mod._id);
            setIsModalOpen(true);
          }}
          className="text-sm text-indigo-600 font-medium"
        >
          + Add Lecture
        </button>
      </section>

      {/* ================= MODAL ================= */}
      {isModalOpen && (
        <AddLectureModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          courseId={courses?._id}
          moduleId={activeModuleId}
          onSuccess={fetchCourse}
        />
      )}
    </>
  );
};

export default CourseLecture;
