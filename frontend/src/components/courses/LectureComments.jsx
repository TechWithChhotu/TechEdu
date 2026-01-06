import { useEffect, useState } from "react";
// import api from "../../services/api";
import { useParams } from "react-router-dom";
import api from "../../services/api.v1.js";
// /api/v1/course/:courseId/lecture/:lectureId/comments
import { useSelector } from "react-redux";
import { selectUserData } from "../../stores/user.slice.js";
const LectureComments = ({ lectureId }) => {
  const { courseId } = useParams();

  console.log("courseId: ", courseId);
  const userData = useSelector(selectUserData);
  console.log("userData: ");

  console.log(userData);

  const [comments, setComments] = useState([]);
  const [message, setMessage] = useState("");

  const fetchComments = async () => {
    const res = await api.get(
      `course/${courseId}/lecture/${lectureId}/comments`,
      {
        withCredentials: true,
      }
    );
    console.log("comments res => ");
    console.log(res);

    setComments(res.data.comments);
  };

  const handleSubmit = async () => {
    if (!message.trim()) return;

    await api.post(
      `course/${courseId}/lecture/${lectureId}/comment`,
      { message },
      { withCredentials: true }
    );

    setMessage("");
    fetchComments();
  };

  useEffect(() => {
    fetchComments();
  }, [lectureId]);

  return (
    <div className="p-4">
      {/* Add Comment */}
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Write your comment..."
        className="w-full border rounded p-2"
      />
      <button
        onClick={handleSubmit}
        className="mt-2 bg-blue-600 text-white px-4 py-2 rounded"
      >
        Comment
      </button>

      {/* Comments List */}
      <div className="mt-4 space-y-4">
        {comments.map((c, index) => (
          <div key={index} className="border p-3 rounded">
            <div className="flex items-center gap-2">
              <img
                src={userData?.data?.avatar}
                className="w-8 h-8 rounded-full"
                alt=""
              />
              <span className="font-semibold">{userData?.data?.name} </span>
            </div>
            <p className="mt-1 text-gray-700">{c?.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LectureComments;
