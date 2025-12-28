import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../services/api.v1";

const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    api.get(`/course/${id}`).then((res) => setCourse(res.data.course));
  }, [id]);

  if (!course) return <p>Loading...</p>;

  const discountedPrice = course.price - (course.price * course.discount) / 100;

  return (
    <section className="max-w-6xl mx-auto p-6">
      <img
        src={course.thumbnail}
        className="w-full h-72 object-cover rounded-xl"
      />

      <h1 className="text-3xl font-bold mt-6">{course.title}</h1>
      <p className="text-slate-500 mt-1">By {course.createdBy}</p>

      <div className="mt-4 flex gap-4 items-center">
        <span className="text-3xl font-bold text-green-600">
          ₹{discountedPrice}
        </span>
        <span className="line-through text-gray-400">₹{course.price}</span>
      </div>

      <button
        onClick={() => navigate(`/checkout/${course._id}`)}
        className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg font-semibold"
      >
        Buy Now
      </button>
    </section>
  );
};

export default CourseDetails;
