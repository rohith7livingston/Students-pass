import React from "react";
import Navbar from "../components/Navbar";

import RecentActivity from "../components/RecentActivity";


  





const StudentHome = () => {
 

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

      <div className="mt-12 flex justify-center">

      <div className="recent-activity">

        <RecentActivity />
      </div>
    </div>
    </div>
  );
};

export default StudentHome;
