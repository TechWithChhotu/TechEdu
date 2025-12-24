import React from "react";
import {
  FaLinkedinIn,
  FaYoutube,
  FaTelegramPlane,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-[#0f0c29] via-[#1c0f2e] to-[#2a0a1f] text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Top Line Text */}
        <p className="text-white text-xl md:text-2xl font-semibold max-w-3xl mb-12">
          Elevate your skills! Seamlessly blend the worlds of{" "}
          <span className="text-indigo-400">technology</span> &{" "}
          <span className="text-pink-400">business</span> together for a future
          full of{" "}
          <span className="text-purple-400">endless possibilities.</span>
        </p>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand & Contact */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">TechEdu</h2>

            <p className="flex items-center gap-2">
              <FaPhoneAlt className="text-indigo-400" />
              +91 89208 23219
            </p>

            <p className="flex items-start gap-2">
              <FaMapMarkerAlt className="mt-1 text-indigo-400" />
              3th Floor Tower A, VIP Road, Near DM office, Sheikhpura, Bihar –
              811105
            </p>

            <p className="flex items-center gap-2">
              <FaEnvelope className="text-indigo-400" />
              support@learnonline.com
            </p>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4 border-b border-indigo-500 inline-block pb-1">
              Company
            </h3>
            <ul className="space-y-3">
              <li className="hover:text-white cursor-pointer">About Us</li>
              <li className="hover:text-white cursor-pointer">Contact Us</li>
              <li className="hover:text-white cursor-pointer">FAQ</li>
              <li className="hover:text-white cursor-pointer">Blog</li>
              <li className="hover:text-white cursor-pointer">
                Career Services
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4 border-b border-indigo-500 inline-block pb-1">
              Categories
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <span className="hover:text-white cursor-pointer">
                Data Science & Analytics
              </span>
              <span className="hover:text-white cursor-pointer">
                Software Development
              </span>
              <span className="hover:text-white cursor-pointer">
                Digital Marketing with AI
              </span>
              <span className="hover:text-white cursor-pointer">
                Banking & Finance
              </span>
              <span className="hover:text-white cursor-pointer">
                Programming Courses
              </span>
              <span className="hover:text-white cursor-pointer">
                Cybersecurity Courses
              </span>
              <span className="hover:text-white cursor-pointer">
                Product Management with AI
              </span>
            </div>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Follow Us</h3>

            <div className="space-y-4">
              <a className="flex items-center gap-3 hover:text-white cursor-pointer">
                <FaLinkedinIn /> LinkedIn
              </a>
              <a className="flex items-center gap-3 hover:text-white cursor-pointer">
                <FaYoutube /> YouTube
              </a>
              <a className="flex items-center gap-3 hover:text-white cursor-pointer">
                <FaTelegramPlane /> Telegram
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-600 my-10"></div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <p>© {currentYear} TechEdu. All rights reserved.</p>

          <div className="flex gap-6">
            <span className="hover:text-white cursor-pointer">
              Privacy Policy
            </span>
            <span className="hover:text-white cursor-pointer">
              Terms & Conditions
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
