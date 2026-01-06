import { useState } from "react";
import AddLectureResources from "../../components/AddLectureResources";
import api from "../../services/api.v1";

const AddLectureModal = ({ courseId }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [video, setVideo] = useState("");
  const [resources, setResources] = useState([]);

  const handleSubmit = async () => {
    await api.post(`/course/${courseId}/add-lecture`, {
      title,
      description,
      video,
      resources, // 👈 important
    });

    alert("Lecture added successfully");
  };

  return (
    <div className="space-y-6">
      <input
        className="border p-2 w-full"
        placeholder="Lecture Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className="border p-2 w-full"
        placeholder="Lecture Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <input
        className="border p-2 w-full"
        placeholder="Video URL"
        value={video}
        onChange={(e) => setVideo(e.target.value)}
      />

      {/* 🔥 Resources UI */}
      <AddLectureResources resources={resources} setResources={setResources} />

      <button
        onClick={handleSubmit}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Save Lecture
      </button>
    </div>
  );
};

export default AddLectureModal;
