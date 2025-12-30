import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  Video,
  ClipboardList,
  HelpCircle,
  Users,
  Wallet,
} from "lucide-react";

const EmployeeSidebar = () => {
  const linkClass =
    "flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-indigo-50 text-slate-700";

  return (
    <aside className="w-64 bg-white shadow-lg p-4">
      <h1 className="text-2xl font-bold text-indigo-600 mb-8">
        TechEdu Teacher
      </h1>

      <nav className="space-y-2">
        <NavLink to="/teacher/dashboard" className={linkClass}>
          <LayoutDashboard size={18} /> Dashboard
        </NavLink>

        <NavLink to="courses" className={linkClass}>
          <BookOpen size={18} /> My Courses
        </NavLink>

        <NavLink to="add-lecture" className={linkClass}>
          <Video size={18} /> Add lecture
        </NavLink>
        <NavLink to="/teacher/live" className={linkClass}>
          <Video size={18} /> Live Classes
        </NavLink>

        <NavLink to="/teacher/lectures" className={linkClass}>
          <Video size={18} /> Recorded Lectures
        </NavLink>

        <NavLink to="/teacher/assignments" className={linkClass}>
          <ClipboardList size={18} /> Assignments
        </NavLink>

        <NavLink to="/teacher/quizzes" className={linkClass}>
          <HelpCircle size={18} /> Quizzes
        </NavLink>

        <NavLink to="/teacher/students" className={linkClass}>
          <Users size={18} /> Students
        </NavLink>

        <NavLink to="/teacher/earnings" className={linkClass}>
          <Wallet size={18} /> Earnings
        </NavLink>
      </nav>
    </aside>
  );
};

export default EmployeeSidebar;
