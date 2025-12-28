import { useState } from "react";
import api from "../../services/api.v1";
import { useNavigate } from "react-router-dom";

const categories = [
  "Web Development",
  "App Development",
  "Data Science & AI",
  "Cyber Security",
  "Cloud & DevOps",
  "Finance & Accounting",
  "Stock Market & Trading",
  "Digital Marketing",
  "UI/UX Design",
  "Vocational & Skill Training",
];

/* ===== Reusable Inputs ===== */

const InputField = ({ label, ...props }) => (
  <div>
    <label className="block mb-1 text-sm font-medium">{label}</label>
    <input
      {...props}
      className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-green-500"
      required
    />
  </div>
);

const TextareaField = ({ label, ...props }) => (
  <div>
    <label className="block mb-1 text-sm font-medium">{label}</label>
    <textarea
      {...props}
      rows="3"
      className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-green-500"
      required
    />
  </div>
);

const SelectField = ({ label, options, ...props }) => (
  <div>
    <label className="block mb-1 text-sm font-medium">{label}</label>
    <select
      {...props}
      className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-green-500"
      required
    >
      <option value="">Select</option>
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  </div>
);

export default function CreateCourse() {
  const navigate = useNavigate();

  const initialFormData = {
    title: "",
    description: "",
    category: "",
    createdBy: "",
    courseDuration: "",
    accessDuration: "Lifetime",
    level: "Beginner",
    language: "English",
    price: 899,
    discount: 0,
    prerequisites: "",
    learningOutcomes: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  const [thumbnail, setThumbnail] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Only image files allowed");
      return;
    }

    setThumbnail(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      payload.append(key, value);
    });

    // convert comma separated text → array
    payload.set(
      "prerequisites",
      JSON.stringify(formData.prerequisites.split(","))
    );
    payload.set(
      "learningOutcomes",
      JSON.stringify(formData.learningOutcomes.split(","))
    );

    if (thumbnail) payload.append("thumbnail", thumbnail);

    try {
      setLoading(true);
      await api.post("/course/create-course", payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Course created successfully");
      setFormData(initialFormData);
      navigate(-1);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to create course");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-bold mb-6">Create New Course</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <InputField
            label="Course Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />

          {/* Description */}
          <TextareaField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />

          {/* Category */}
          <SelectField
            label="Category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            options={categories}
          />

          {/* Instructor */}
          <InputField
            label="Instructor Name"
            name="createdBy"
            value={formData.createdBy}
            onChange={handleChange}
          />

          {/* Duration */}
          <InputField
            label="Course Duration"
            name="courseDuration"
            placeholder="e.g. 6 Months"
            value={formData.courseDuration}
            onChange={handleChange}
          />

          {/* Access Duration */}
          <InputField
            label="Access Duration"
            name="accessDuration"
            value={formData.accessDuration}
            onChange={handleChange}
          />

          {/* Level */}
          <SelectField
            label="Level"
            name="level"
            value={formData.level}
            onChange={handleChange}
            options={["Beginner", "Intermediate", "Advanced"]}
          />

          {/* Language */}
          <InputField
            label="Language"
            name="language"
            value={formData.language}
            onChange={handleChange}
          />

          {/* Price */}
          <InputField
            label="Price"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
          />

          {/* Discount */}
          <InputField
            label="Discount (%)"
            name="discount"
            type="number"
            value={formData.discount}
            onChange={handleChange}
          />

          {/* Prerequisites */}
          <TextareaField
            label="Prerequisites (comma separated)"
            name="prerequisites"
            value={formData.prerequisites}
            onChange={handleChange}
          />

          {/* Learning Outcomes */}
          <TextareaField
            label="Learning Outcomes (comma separated)"
            name="learningOutcomes"
            value={formData.learningOutcomes}
            onChange={handleChange}
          />

          {/* Thumbnail */}
          <div>
            <label className="font-medium">Thumbnail</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleThumbnailChange}
            />
            {preview && <img src={preview} className="mt-2 w-40 rounded" />}
          </div>

          <button
            disabled={loading}
            className={`w-full py-3 rounded-lg text-white font-semibold ${
              loading ? "bg-green-300" : "bg-green-500 hover:bg-green-600"
            }`}
          >
            {loading ? "Creating..." : "Create Course"}
          </button>
        </form>
      </div>
    </section>
  );
}
