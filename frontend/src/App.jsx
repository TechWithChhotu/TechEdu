import TechEdu from "../src/assets/images/TechEdu.png";
import Home from "./pages/Home";
import Layout from "./components/layout/Layout";

import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import Courses from "./pages/Courses";
import About from "./pages/About";
import Contact from "./pages/Contact";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="" element={<Layout />}>
      <Route path="" element={<Home />} />
      <Route path="/courses" element={<Courses />} />

      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
    </Route>
  )
);
function App() {
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
