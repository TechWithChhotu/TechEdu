import { Link } from "react-router-dom";
const MyCourseCard = ({ course }) => {
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition">
      <img
        src={course.thumbnail}
        alt={course.title}
        className="w-full h-40 object-cover rounded-t-xl"
      />

      <div className="p-4">
        <h3 className="font-semibold text-lg">{course.title}</h3>
        <p className="text-sm text-gray-500">By {course.createdBy}</p>

        <Link
          to={`${course._id}`}
          className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 px-5"
        >
          Continue Learning
        </Link>
      </div>
    </div>
  );
};

export default MyCourseCard;
