import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast ,ToastContainer } from "react-toastify"; // Import toast
import Navbar from "../components/Navbar";
import RecentActivity from "../components/RecentActivity";
import Footer from "../components/Footer";
const StudentHome = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (!user) {
      toast.warn("Please login to continue!", {
        autoClose: 3000,
      });

      setTimeout(() => {
        navigate("/login");
      }, 3000);
    }
  }, [navigate]);

  return (
    <div className="relative min-h-screen bg-pink-50 flex flex-col">
      <Navbar />
    
      {/* Responsive Background Huge Text */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center z-0 pointer-events-none">
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
      <div className="relative z-10 mt-10 flex justify-center px-4 mb-20">
        <div className="recent-activity w-full max-w-3xl">
          <RecentActivity />
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
      {/* 🔥 Footer Section */}
      <Footer  />
    </div>
  );
};

export default StudentHome;
