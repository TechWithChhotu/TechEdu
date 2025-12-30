import { Outlet } from "react-router-dom";
import EmployeeSidebar from "./EmployeeSidebar";
import EmployeeNavbar from "./EmployeeNavbar";

const EmployeeLayout = () => {
  return (
    <div className="flex min-h-screen bg-slate-100">
      <EmployeeSidebar />

      <div className="flex-1 flex flex-col">
        <EmployeeNavbar />
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default EmployeeLayout;
