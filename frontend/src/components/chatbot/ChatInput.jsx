import { Send } from "lucide-react";
import { useState } from "react";

export default function ChatInput({ onSend }) {
  const [text, setText] = useState("");

  const handleSend = () => {
    onSend(text);
    setText("");
  };

  return (
    <div className="border-t p-3 flex gap-2">
      <input
        className="flex-1 border rounded-full px-4 py-2 text-sm outline-none"
        placeholder="Ask TechEdu AI..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
      />
      <button
        onClick={handleSend}
        className="bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-full"
      >
        <Send size={18} />
      </button>
    </div>
  );
}
