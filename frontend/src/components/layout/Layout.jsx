import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import ChatbotModal from "../chatbot/ChatbotModal";
import ChatbotButton from "../chatbot/ChatbotButton";
import { useState } from "react";

function Layout() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      {/* your existing layout */}
      {open && <ChatbotModal onClose={() => setOpen(false)} />}
      <ChatbotButton onClick={() => setOpen(true)} />
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Layout;
