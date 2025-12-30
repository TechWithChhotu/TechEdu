import { X } from "lucide-react";

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-white w-full max-w-2xl rounded-2xl p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
        >
          <X size={24} />
        </button>

        {/* Title */}
        <h2 className="text-xl font-semibold mb-4">{title}</h2>

        {/* Content */}
        {children}
      </div>
    </div>
  );
};

export default Modal;
