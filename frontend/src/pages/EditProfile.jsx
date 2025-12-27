import { X, Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import api from "../services/api.v1.js";
import { setUserData } from "../stores/user.slice.js";

export default function EditProfile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Redux user data
  const reduxUserData = useSelector((state) => state.userSlice?.userData);

  // Local states
  const [data, setData] = useState(null);
  const [name, setName] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);
  const [saving, setSaving] = useState(false);

  // Load data from redux
  useEffect(() => {
    if (reduxUserData?.data) {
      setData(reduxUserData.data);
      setName(reduxUserData.data.name || "");
    }
  }, [reduxUserData]);

  // ⛔ Guard (VERY IMPORTANT)
  if (!data) return null;

  // Original values
  const originalName = data.name;
  const originalAvatar = data.avatar;

  // Change detection
  const isNameChanged = name.trim() !== originalName;
  const isAvatarChanged = !!avatarFile;
  const isFormChanged = isNameChanged || isAvatarChanged;

  // Avatar handlers
  const handleAvatarChange = (file) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert("Image size must be less than 2MB");
      return;
    }

    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const handleInputChange = (e) => {
    handleAvatarChange(e.target.files[0]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleAvatarChange(e.dataTransfer.files[0]);
  };

  // Save profile
  const handleSaveChanges = async () => {
    if (!isFormChanged) return;

    setSaving(true);
    try {
      const formData = new FormData();
      formData.append("name", name);

      if (avatarFile) {
        formData.append("avatar", avatarFile);
      }

      const res = await api.put("/user/edit-profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Update redux
      dispatch(setUserData(res.data));

      setSaving(false);
      navigate(-1);
    } catch (error) {
      setSaving(false);
      alert(error.response?.data?.message || "Profile update failed");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="relative bg-white rounded-2xl w-full max-w-3xl p-8 shadow-xl">
        {/* Close */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
        >
          <X size={26} />
        </button>

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              className="relative w-20 h-20 rounded-full overflow-hidden
                         border-2 border-dashed border-indigo-300
                         cursor-pointer flex items-center justify-center"
            >
              <img
                src={avatarPreview || data.avatar}
                alt="Avatar"
                className="w-full h-full object-cover"
              />

              <input
                type="file"
                accept="image/*"
                id="avatarInput"
                className="hidden"
                onChange={handleInputChange}
              />

              <label
                htmlFor="avatarInput"
                className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow cursor-pointer"
              >
                <Pencil size={14} />
              </label>
            </div>

            <h2 className="text-2xl font-semibold">Your Profile</h2>
          </div>

          <button className="flex items-center gap-2 text-red-500 hover:text-red-600 text-sm">
            <Trash2 size={16} />
            Delete Account
          </button>
        </div>

        {/* Form */}
        <form className="space-y-6">
          {/* Name */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded-lg px-4 py-3 outline-none focus:border-indigo-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">Email</label>
            <input
              type="email"
              value={data.email}
              readOnly
              className="w-full border rounded-lg px-4 py-3
                         bg-gray-100 text-gray-500
                         cursor-not-allowed outline-none"
            />
          </div>

          <p className="text-xs text-gray-400 text-center">
            Click or drag image to change profile picture
          </p>

          {/* Save */}
          <div className="pt-6 flex justify-center">
            <button
              type="button"
              disabled={!isFormChanged || saving}
              onClick={handleSaveChanges}
              className={`
                font-semibold px-10 py-3 rounded-lg transition
                ${
                  isFormChanged && !saving
                    ? "bg-green-500 hover:bg-green-600 text-white"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }
              `}
            >
              {saving ? "Saving changes..." : "Save changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
