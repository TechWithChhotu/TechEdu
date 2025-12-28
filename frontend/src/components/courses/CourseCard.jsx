import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CourseCard = ({ course }) => {
  const navigate = useNavigate();

  const {
    _id,
    title,
    thumbnail,
    price,
    discount,
    createdBy,
    category,
    rating = 4.8,
    students = 1200,
  } = course;

  const discountedPrice = Math.round(price - (price * discount) / 100);

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden border border-slate-100">
      {/* Thumbnail */}
      <div className="relative">
        <img src={thumbnail} alt={title} className="w-full h-48 object-cover" />

        {discount > 0 && (
          <span className="absolute top-3 left-3 bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
            {discount}% OFF
          </span>
        )}

        <span className="absolute bottom-3 left-3 bg-indigo-600/90 text-white text-xs px-3 py-1 rounded-full">
          {category}
        </span>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Title */}
        <h3 className="font-semibold text-slate-900 line-clamp-2">{title}</h3>

        {/* Mentor */}
        <p className="text-sm text-slate-500">
          By <span className="font-medium text-slate-700">{createdBy}</span>
        </p>

        {/* Rating */}
        <div className="flex items-center gap-2 text-sm">
          <div className="flex items-center gap-1 text-yellow-500">
            <Star size={14} fill="currentColor" />
            <span>{rating}</span>
          </div>
          <span className="text-slate-400">•</span>
          <span className="text-slate-500">
            {students.toLocaleString()} students
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-3">
          <span className="text-xl font-bold text-green-600">
            ₹{discountedPrice}
          </span>

          {discount > 0 && (
            <span className="text-sm line-through text-slate-400">
              ₹{price}
            </span>
          )}
        </div>

        {/* CTA Buttons */}
        <div className="flex gap-3 pt-2">
          {/* View */}
          <button
            onClick={() => navigate(`/courses/${_id}`)}
            className="w-1/2 border border-indigo-600 text-indigo-600 
                       hover:bg-indigo-50 font-semibold py-2 rounded-lg transition"
          >
            View
          </button>

          {/* Buy */}
          <button
            onClick={() => navigate(`/checkout/${_id}`)}
            className="w-1/2 bg-indigo-600 hover:bg-indigo-700 
                       text-white font-semibold py-2 rounded-lg transition"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
