import { useEffect, useState } from "react";
import api from "../../services/api.v1";
import MyCourseCard from "./MyCourseCard";

const MyCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

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
    <section className="min-h-screen p-6 bg-slate-50">
      <h1 className="text-2xl font-bold mb-6">My Courses</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {courses.map((course) => (
          <MyCourseCard key={course._id} course={course} />
        ))}
      </div>
    </section>
  );
};

export default MyCourses;
