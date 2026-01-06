import { useState } from "react";
import api from "../services/api.v1";
const AddResourceForm = ({ courseId, lectureId, onClose }) => {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("pdf");
  const [url, setUrl] = useState("");

  const handleSave = async () => {
    await api.post(`/course/${courseId}/lecture/${lectureId}/resource`, {
      // /:courseId/lecture/:lectureId/resource
      title,
      type,
      url,
    });
    onClose();
  };

  return (
    <div className="space-y-3">
      <input
        className="border p-2 w-full"
        placeholder="Resource Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <select
        className="border p-2 w-full"
        value={type}
        onChange={(e) => setType(e.target.value)}
      >
        <option value="pdf">PDF</option>
        <option value="link">Link</option>
        <option value="code">Code</option>
        <option value="doc">Document</option>
        <option value="other">Other</option>
      </select>

      <input
        className="border p-2 w-full"
        placeholder="Resource URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />

      <button
        onClick={handleSave}
        className="bg-indigo-600 text-white px-4 py-2 rounded w-full"
      >
        Save Resource
      </button>
    </div>
  );
};

export default AddResourceForm;
