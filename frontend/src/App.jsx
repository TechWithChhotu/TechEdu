import TechEdu from "../src/assets/images/TechEdu.png";
import Home from "./pages/Home";
import Layout from "./components/layout/Layout";
import { useDispatch } from "react-redux";
import { setAuth, setCourses } from "./stores/user.slice.js";

import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Auth from "./pages/Auth";
import { useEffect, useState } from "react";
import api from "./services/api.v1";
import EditProfile from "./pages/EditProfile.jsx";
import CreateCourse from "./admin/pages/CreateCourse.jsx";
import AdminLayout from "./admin/layout/AdminLayout.jsx";
import Dashboard from "./admin/pages/Dashboard.jsx";
import Users from "./admin/pages/Users.jsx";
import Orders from "./admin/pages/Order.jsx";
import Courses from "./pages/courses/Courses.jsx";
import CourseDetails from "./pages/courses/CourseDetails.jsx";
import Checkout from "./pages/checkout/Checkout.jsx";
import MyCourses from "./pages/courses/MyCourses.jsx";
import EmployeeLayout from "./employees/EmployeeLayout.jsx";
import EmployeeDashboard from "./employees/EmployeeDashboard.jsx";
import CourseLectures from "./pages/courses/CourseLecture.jsx";
import AddLectureModal from "./pages/courses/AddLecture.jsx";
import WatchLecture from "./pages/watch/WatchLecture.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="">
      <Route path="" element={<Layout />}>
        <Route path="" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/profile" element={<EditProfile />} />

        <Route path="/courses" element={<Courses />} />
        <Route path="/my-courses" element={<MyCourses />} />
        <Route path="/my-courses/:courseId" element={<WatchLecture />} />

        <Route path="/courses/:id" element={<CourseDetails />} />
        <Route path="/checkout/:id" element={<Checkout />} />
      </Route>
      {/* ====================Admin routes================= */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="users" element={<Users />} />
        {/* <Route path="courses" element={<Courses />} /> */}
        <Route path="create-course" element={<CreateCourse />} />
        <Route path="orders" element={<Orders />} />
      </Route>

      <Route path="/emp" element={<EmployeeLayout />}>
        <Route path="dashboard" element={<EmployeeDashboard />} />
        <Route path="courses" element={<MyCourses />} />
        <Route path="course/:courseId/content" element={<CourseLectures />} />
        <Route path="add-lecture" element={<CourseLectures />} />
        <Route path="add-lecture/:courseId" element={<AddLectureModal />} />

        {/* emp/add-lecture/6950e85de9fc9c3dd08b9375 */}
      </Route>
    </Route>
  )
);
function App() {
  const dispatch = useDispatch();

  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await api.get("/course");

        // console.log("API response:", res.data);

        dispatch(setCourses(res.data.courses));
      } catch (err) {
        console.error("Fetch courses error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`user/get-user-profile`, {
          withCredentials: true,
        });
        if (response) {
          // console.log("get-account ==> ");
          // console.log(response.data);
          dispatch(setAuth(response.data));
        }
      } catch (error) {
        console.error("Error fetching account data:", error);
      }
    };

    fetchData();
  }, [dispatch]);

  return (
    // <div className="h-screen flex items-center justify-center bg-slate-900">
    //   <h1 className="text-4xl font-bold text-green-500">TechEdu 🚀</h1>
    //   <img src={TechEdu} alt="TechEdu" className="w-32 h-32" />
    // </div>
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
