import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  PlusCircle,
  CreditCard,
  Settings,
} from "lucide-react";
import TechEdu from "../../assets/images/TechEdu_fit_to_logo.png";

const menu = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/admin/dashboard" },
  { name: "Users", icon: Users, path: "/admin/users" },
  { name: "Courses", icon: BookOpen, path: "/admin/courses" },
  { name: "Create Course", icon: PlusCircle, path: "/admin/create-course" },
  { name: "Payments", icon: CreditCard, path: "/admin/orders" },
  { name: "Settings", icon: Settings, path: "/admin/settings" },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen">
      <h1 className="text-2xl font-bold text-green-500 px-6 py-4">
        <img src={TechEdu} alt="" className="w-40" />
      </h1>

      <nav className="px-4 space-y-2">
        {menu.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition
              ${
                isActive
                  ? "bg-green-500 text-white"
                  : "text-slate-300 hover:bg-slate-800"
              }`
            }
          >
            <item.icon size={18} />
            {item.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
