import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import RecentActivity from "../components/RecentActivity";

const StudentHome = () => {
  return (
    <div className="relative min-h-screen bg-pink-50 flex flex-col">
      <Navbar />

      {/* Responsive Background Huge Text */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center z-0 pointer-events-none">
        <h1 className="text-6xl md:text-[10rem] lg:text-[12rem] font-extrabold text-gray-300 opacity-10 md:opacity-20">
          RIGHT AWAY
        </h1>
      </div>

      {/* Main Content */}
      <div className="relative z-11 flex-grow mt-16 md:mt-24 flex justify-center px-4">
        <div className="text-center mt-5">
          <h1 className="text-4xl md:text-5xl font-light text-gray-700">
            Apply Leave
          </h1>
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mt-2">
            Consider it <span className="text-red-600">Done</span>
          </h1>
          <Link to="/apply">
            <button className="mt-6 px-6 py-3 rounded-full bg-red-600 text-white text-lg font-medium shadow-md hover:bg-red-500 hover:shadow-lg transition-all duration-300">
              Apply Leave
            </button>
          </Link>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="relative z-10 mt-12 flex justify-center px-4">
        <div className="recent-activity w-full max-w-3xl">
          <RecentActivity />
        </div>
      </div>

      {/* 🔥 Footer Section */}
      <footer className="bg-white text-gray-700 py-12 mt-16 shadow-md">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="flex flex-col items-center md:items-start">
            <h1 className="text-3xl font-bold text-red-600">Right Away</h1>
            <p className="text-gray-600 mt-3 text-center md:text-left">
              Your trusted leave management system. Apply with ease, get
              approvals instantly.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col items-center md:items-center">
            <h2 className="text-xl font-semibold text-gray-800">Quick Links</h2>
            <ul className="mt-5 space-y-1 text-gray-600">
              <li>
                <Link to="/about" className="hover:text-red-500 transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-red-500 transition">
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy-policy"
                  className="hover:text-red-500 transition"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms-of-service"
                  className="hover:text-red-500 transition"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media & Contact */}
          <div className="flex flex-col items-center md:items-end">
            <h2 className="text-xl font-semibold text-gray-800">
              Connect With Us
            </h2>
            <div className="flex gap-4 mt-3">
              <a
                href="#"
                className="text-gray-600 hover:text-red-500 transition text-2xl"
              >
                <i className="fab fa-facebook"></i>
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-red-500 transition text-2xl"
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-red-500 transition text-2xl"
              >
                <i className="fab fa-instagram"></i>
              </a>
            </div>
            <p className="text-gray-600 mt-3">Email: support@rightaway.com</p>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-gray-300 pt-4 text-center text-gray-600 text-sm">
          &copy; {new Date().getFullYear()}{" "}
          <span className="text-red-600 font-semibold">Right Away</span>. All
          Rights Reserved.
        </div>
      </footer>
    </div>
  );
};

export default StudentHome;
