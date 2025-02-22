import React from "react";
import Navbar from "../components/Navbar";
import "./../stylesheet/StudentHome.css";

const StudentHome = () => {
  const activities = [
    { title: "Title of the letter", status: "Approved", className: "approved" },
    {
      title: "Title of tjhjjnjhe letter",
      status: "Rejected",
      className: "rejected",
    },
    {
      title: "Title of tjnnkjnjhe letter",
      status: "Pending",
      className: "pending",
    },
  ];
  return (
    <div>
      <Navbar />
      <div className="description-student">
        <div className="description">
          <h1 style={{ fontWeight: 350 }}>Apply Leave</h1>
          <h1>
            <b>Consider it Done</b>
          </h1>
          <button className="apply-leave">Apply Leave</button>
        </div>
      </div>
      <div className="recent-activity-box">
        <div className="recent-activity">
          <div className="activity-header">
            hai
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentHome;
