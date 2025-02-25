import React from "react";
import Navbar from "../components/Navbar";
<<<<<<< HEAD
import RecentActivity from "../components/RecentActivity";

const StudentHome = () => {
  

=======
import RecentActivity from "./../components/RecentActivity";
import "./../stylesheet/StudentHome.css";

const StudentHome = () => {
 
>>>>>>> 681ebe022d83b6eaaa5e73661a60bcc928628a78
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="mt-24 flex justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-light">Apply Leave</h1>
          <h1 className="text-3xl font-bold">Consider it Done</h1>
          <button className="w-32 h-9 mt-5 px-4 py-1 rounded-full bg-red-600 text-white hover:bg-red-400 transition duration-1000">
            Apply Leave
          </button>
        </div>
      </div>
<<<<<<< HEAD
      <div className="mt-12 flex justify-center">
=======
      <div className="recent-activity">
>>>>>>> 681ebe022d83b6eaaa5e73661a60bcc928628a78
        <RecentActivity />
      </div>
    </div>
  );
};

export default StudentHome;
