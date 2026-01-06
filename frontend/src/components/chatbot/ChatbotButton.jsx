import { MessageCircle } from "lucide-react";

export default function ChatbotButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 bg-indigo-600 hover:bg-indigo-700 
                 text-white p-4 rounded-full shadow-xl z-50"
    >
      <MessageCircle size={26} />
    </button>
  );
}
