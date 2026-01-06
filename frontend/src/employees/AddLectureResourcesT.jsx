import { useState } from "react";

const AddLectureResources = ({ resources, setResources }) => {
  const [resource, setResource] = useState({
    title: "",
    type: "pdf",
    url: "",
  });

  const handleAdd = () => {
    if (!resource.title || !resource.url) return;

    setResources([...resources, resource]);
    setResource({ title: "", type: "pdf", url: "" });
  };

  const removeResource = (index) => {
    setResources(resources.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">Lecture Resources</h3>

      {/* Input Fields */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <input
          type="text"
          placeholder="Resource Title"
          className="border rounded p-2"
          value={resource.title}
          onChange={(e) => setResource({ ...resource, title: e.target.value })}
        />

        <select
          className="border rounded p-2"
          value={resource.type}
          onChange={(e) => setResource({ ...resource, type: e.target.value })}
        >
          <option value="pdf">PDF</option>
          <option value="link">Link</option>
          <option value="code">Code</option>
          <option value="doc">Document</option>
          <option value="other">Other</option>
        </select>

        <input
          type="text"
          placeholder="Resource URL"
          className="border rounded p-2"
          value={resource.url}
          onChange={(e) => setResource({ ...resource, url: e.target.value })}
        />
      </div>

      <button
        onClick={handleAdd}
        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
      >
        Add Resource
      </button>

      {/* Resource List */}
      {resources.length > 0 && (
        <div className="space-y-2">
          {resources.map((res, index) => (
            <div
              key={index}
              className="flex justify-between items-center border p-2 rounded"
            >
              <div>
                <p className="font-medium">{res.title}</p>
                <p className="text-xs text-gray-500">
                  {res.type.toUpperCase()}
                </p>
              </div>

              <button
                onClick={() => removeResource(index)}
                className="text-red-500 text-sm"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AddLectureResources;
