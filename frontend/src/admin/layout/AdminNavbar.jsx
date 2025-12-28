import { Bell, LogOut } from "lucide-react";
import { useSelector } from "react-redux";
import { selectUserData } from "../../stores/user.slice";

const AdminNavbar = () => {
  const data = useSelector(selectUserData);
  console.log("data(adminNavbar.jsx): ");
  console.log(data);

  return (
    <header className="h-16 bg-white shadow flex items-center justify-between px-6">
      <h2 className="text-lg font-semibold text-violet-600 text-center w-full b">
        Admin Dashboard
      </h2>

      <div className="flex items-center gap-4">
        <Bell className="text-slate-500 cursor-pointer" />
        <img
          // src="https://i.pravatar.cc/40" //his get random images
          src={data?.data?.avatar}
          alt="admin"
          className="w-10 h-10 rounded-full"
        />
        <LogOut className="text-red-500 cursor-pointer" />
      </div>
    </header>
  );
};

export default AdminNavbar;
