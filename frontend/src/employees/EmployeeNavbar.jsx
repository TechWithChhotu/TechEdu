import { Bell, LogOut } from "lucide-react";

const EmployeeNavbar = () => {
  return (
    <header className="h-16 bg-white shadow flex items-center justify-between px-6">
      <h2 className="text-lg font-semibold text-indigo-600">
        Teacher Dashboard
      </h2>

      <div className="flex items-center gap-4">
        <Bell className="text-slate-500 cursor-pointer" />
        <img
          src="https://i.pravatar.cc/40"
          alt="teacher"
          className="w-10 h-10 rounded-full"
        />
        <LogOut className="text-red-500 cursor-pointer" />
      </div>
    </header>
  );
};

export default EmployeeNavbar;
