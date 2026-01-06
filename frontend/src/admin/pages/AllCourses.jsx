import { useEffect, useState } from "react";
import CourseCard from "../../components/courses/CourseCard";
import CourseFilters from "../../components/courses/CourseFilters";
import api from "../../services/api.v1";

const AllCourses = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await api.get("/course");
        setCourses(res.data.courses);
        setFilteredCourses(res.data.courses);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <section className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Explore Courses</h1>
          <p className="text-slate-500 mt-1">
            Learn industry-ready skills with TechEdu
          </p>
        </div>

        {/* Filters */}
        <CourseFilters
          courses={courses}
          setFilteredCourses={setFilteredCourses}
        />

        {/* Content */}
        {loading ? (
          <p className="text-center py-20 text-slate-500">Loading courses...</p>
        ) : filteredCourses.length === 0 ? (
          <p className="text-center py-20 text-slate-500">No courses found</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
            {filteredCourses.map((course) => (
              <CourseCard key={course._id} course={course} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default AllCourses;
