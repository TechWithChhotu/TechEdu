import { useState } from "react";
import { Link } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

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

        {/* Auth Buttons (Desktop) */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            to="/login"
            className="text-slate-300 hover:text-white transition"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="bg-green-500 hover:bg-green-600 text-black font-semibold px-5 py-2 rounded-lg transition"
          >
            Register
          </Link>
        </div>

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
