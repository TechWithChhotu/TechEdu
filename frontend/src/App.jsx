import TechEdu from "../src/assets/images/TechEdu.png";
import Home from "./pages/Home";
import Layout from "./components/layout/Layout";
import { useDispatch } from "react-redux";
import { setAuth } from "./stores/user.slice.js";

import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import Courses from "./pages/Courses";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Auth from "./pages/Auth";
import { useEffect } from "react";
import api from "./services/api.v1";
import EditProfile from "./pages/EditProfile.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="" element={<Layout />}>
      <Route path="" element={<Home />} />
      <Route path="/courses" element={<Courses />} />

      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/profile" element={<EditProfile />} />
    </Route>
  )
);
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      console.log("FetchData from App");
      try {
        const response = await api.get(`user/get-user-profile`, {
          withCredentials: true,
        });
        if (response) {
          console.log("get-account ==> ");
          console.log(response.data);
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
