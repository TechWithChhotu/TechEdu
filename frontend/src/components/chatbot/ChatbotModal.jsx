import { X } from "lucide-react";
import { useState } from "react";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";

export default function ChatbotModal({ onClose }) {
  const [messages, setMessages] = useState([
    { role: "ai", text: "Hi 👋 I’m TechEdu AI. How can I help you today?" },
  ]);
  const [loading, setLoading] = useState(false);

  const handleSend = async (text) => {
    if (!text) return;

    setMessages((prev) => [...prev, { role: "user", text }]);
    setLoading(true);

    // 🔮 TEMP AI RESPONSE (replace with API later)
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: "Great question! Let me explain this step by step.",
        },
      ]);
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-end z-50">
      <div className="w-full sm:w-[420px] bg-white h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <div>
            <h2 className="font-semibold text-lg">TechEdu AI</h2>
            <p className="text-xs text-gray-500">Ask anything about courses</p>
          </div>
          <button onClick={onClose}>
            <X />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((msg, i) => (
            <ChatMessage key={i} role={msg.role} text={msg.text} />
          ))}

          {loading && (
            <div className="text-sm text-gray-400">TechEdu AI is typing...</div>
          )}
        </div>

        {/* Input */}
        <ChatInput onSend={handleSend} />
      </div>
    </div>
  );
}
