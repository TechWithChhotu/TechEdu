import { Link, useNavigate } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";

import { useState, useRef, useEffect } from "react";
import { User, LogOut, BookOpen, Edit } from "lucide-react";
// import { logout } from "../../redux/slices/authSlice";
import { setLogout, getUserData } from "../../stores/user.slice.js";
export default function Navbar() {
  // ------------------
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    dispatch(setLogout());
    navigate("/");
  };

  // ----------------
  const [isOpen, setIsOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [userData, setUserData] = useState(false);
  const data = useSelector((state) => state.userSlice.userData);
  const login = useSelector((state) => state.userSlice.login);
  useEffect(() => {
    const checkLogin = async () => {
      const loginStatus = await login;
      setIsLogin(loginStatus);

      console.log("Login (isLogin)=> ", loginStatus);
    };
    checkLogin();
  }, [login]);

  useEffect(() => {
    const getData = async () => {
      const userdata = await data;
      setUserData(userdata);
      console.log("userData: ");
      console.log(userData);
    };
    getData();
  }, [data]);
  return (
    <header className="sticky top-0 z-50 bg-slate-950 border-b border-slate-800">
      <nav className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/TechEdu.png"
            alt="TechEdu Logo"
            className="w-10 h-10 object-contain"
          />
          <span className="text-xl font-bold text-white">
            Tech<span className="text-green-500">Edu</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-8 text-slate-300 font-medium">
          <li className="hover:text-white transition">
            <Link to="/courses">Courses</Link>
          </li>
          <li className="hover:text-white transition">
            <Link to="/about">About</Link>
          </li>
          <li className="hover:text-white transition">
            <Link to="/contact">Contact</Link>
          </li>
        </ul>

        <div
          className="hidden md:flex items-center gap-4 relative"
          ref={dropdownRef}
        >
          {isLogin ? (
            <>
              {/* Profile Icon */}
              <button
                onClick={() => setOpen(!open)}
                className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-slate-700 transition"
              >
                {/* <User className="text-white" size={40}  /> */}
                <img
                  src={userData.data.avatar}
                  alt="Avatar"
                  className="w-10 h-10 rounded-full"
                />
              </button>

              {/* Dropdown */}
              {open && (
                <div className="absolute right-0 top-14 w-52 bg-white rounded-xl shadow-lg border overflow-hidden z-50">
                  <h2 className="text-center text-green-500 ">
                    👋 {userData.data.name}
                  </h2>
                  <Link
                    to="/my-courses"
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 text-sm"
                  >
                    <BookOpen size={16} /> My Courses
                  </Link>

                  <Link
                    to="/profile"
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 text-sm"
                  >
                    <Edit size={16} /> Edit Profile
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100 text-sm text-red-600"
                  >
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              )}
            </>
          ) : (
            <Link to="/auth" className="flex items-center gap-1">
              <span className="text-slate-300 hover:text-green-500 font-semibold transition">
                Login
              </span>
              <span className="text-green-500 hover:text-slate-300 font-semibold transition">
                /
              </span>
              <span className="text-green-500 hover:text-slate-300 font-semibold transition">
                Register
              </span>
            </Link>
          )}
        </div>

        {/* Auth Buttons (Desktop) */}
        {/* <div className="hidden md:flex items-center gap-4">
          {isLogin ? (
            <span className="text-white">Profile icon </span>
          ) : (
            <Link to="/auth">
              <span className="text-slate-300 hover:text-green-500 font-semibold transition">
                Login{"/"}
              </span>

              <span className="text-green-500 hover:text-slate-300  font-semibold  py-2 rounded-lg transition">
                Register
              </span>
            </Link>
          )}
        </div> */}

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white text-2xl"
        >
          {isOpen ? <HiX /> : <HiMenu />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-slate-900 border-t border-slate-800">
          <ul className="flex flex-col gap-4 px-6 py-4 text-slate-300">
            <Link onClick={() => setIsOpen(false)} to="/courses">
              Courses
            </Link>
            <Link onClick={() => setIsOpen(false)} to="/about">
              About
            </Link>
            <Link onClick={() => setIsOpen(false)} to="/contact">
              Contact
            </Link>
            <Link onClick={() => setIsOpen(false)} to="/login" className="pt-2">
              Login
            </Link>
            <Link
              onClick={() => setIsOpen(false)}
              to="/register"
              className="bg-green-500 text-black text-center font-semibold py-2 rounded-lg"
            >
              Register
            </Link>
          </ul>
        </div>
      )}
    </header>
  );
}
