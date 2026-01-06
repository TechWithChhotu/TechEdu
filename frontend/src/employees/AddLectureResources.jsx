import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api.v1";
import AddResourceForm from "./AddResourceForm";
const AddLectureResources = () => {
  const { courseId } = useParams();
  const [lectures, setLectures] = useState(null);
  const [selectedLecture, setSelectedLecture] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const getLecture = async () => {
      const res = await api.get(`course/${courseId}`);
      setLectures(res.data.course.lectures);
    };
    getLecture();
  }, [courseId]);

  const openModal = (lecture) => {
    setSelectedLecture(lecture);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedLecture(null);
    setIsModalOpen(false);
  };

  if (!lectures) return <p>Loading lectures...</p>;
  const date = new Date();
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold">Add Resources</h2>
      <p className="text-gray-500 mb-4">Select a lecture to add resources</p>

      <div className="space-y-3">
        {lectures.map((lecture) => (
          <button
            key={lecture._id}
            onClick={() => openModal(lecture)}
            className="border rounded-lg p-3 flex gap-3 items-center w-full hover:bg-gray-50"
          >
            <img
              src="https://www.bing.com/ck/a?!&&p=86f37f3105f413eee9c156a52cc90119d921982e48eaeacff6ac3327b14f365aJmltdHM9MTc2NzIyNTYwMA&ptn=3&ver=2&hsh=4&fclid=3854b42b-8432-61fc-2608-a2af854b60f1&u=a1L2ltYWdlcy9zZWFyY2g_cT1sZWN0dXJlK2ltYWdlJmlkPTRBOTFFNkJGNjcxMjcyMEU0MEI1RTYzQjcxN0U3MzA4OUI4QTVBNTAmRk9STT1JQUNGSVI&ntb=1"
              alt="Lecture Thumbnail"
              className="w-24 h-16 object-cover rounded"
            />

            <div>
              <p className="font-medium text-gray-800">{lecture.title}</p>
            </div>
            <div>
              {" "}
              <p className="text-xs text-gray-500">
                {new Date(lecture.createdAt).toLocaleDateString("en-IN")}
              </p>
            </div>
            <div>
              {" "}
              <p className="text-xs text-gray-500">{lecture._id}</p>
            </div>
          </button>
        ))}
      </div>

      {/* ================= MODAL ================= */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-lg rounded-lg p-5">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                Add Resources – {selectedLecture.title}
              </h3>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-black"
              >
                ✕
              </button>
            </div>

            {/* 🔥 RESOURCE FORM */}
            <AddResourceForm
              courseId={courseId}
              lectureId={selectedLecture._id}
              onClose={closeModal}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AddLectureResources;
