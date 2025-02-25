<<<<<<< HEAD
import React from "react";

const RecentActivity = () => {
  const activities = [
    { title: "Title of the letter", status: "Approved", className: "bg-green-500" },
    { title: "Title of tjhjjnjhe letter", status: "Rejected", className: "bg-red-600" },
    { title: "Title of tjnnkjnjhe letter", status: "Pending", className: "bg-yellow-500" },
    { title: "Title of the letter", status: "Approved", className: "bg-green-500" },
  ];

  return (
    <div className="bg-white shadow-md rounded-lg p-5 w-full md:w-[800px]">
      {/* Header */}
      <div className="border-b-2 border-gray-300 pb-2 mb-2 font-bold text-lg">
        <h3>Recent Activity</h3>
      </div>

      {/* Activity List */}
      <div className="flex flex-row gap-2">
        {/* Titles Section */}
        <div className="w-[85%] flex flex-col gap-2">
          {activities.map((activity, index) => (
            <div key={index} className="bg-gray-200 p-3 rounded-md">
              <span className="font-bold">{activity.title}</span>
            </div>
          ))}
        </div>

        {/* Status Section */}
        <div className="flex flex-col gap-2">
          {activities.map((activity, index) => (
            <div key={index} className={`text-white font-bold text-center p-2 rounded-md ${activity.className}`}>
              {activity.status}
            </div>
          ))}
=======
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./../stylesheet/RecentActivity.css";

const RecentActivity = () => {
  const [activities, setActivities] = useState([]);
  const regno = "22K61A0529"; // Default registration number

  useEffect(() => {
    const fetchRecentActivity = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/getLeave/${regno}`
        );
        console.log("API Response:", response.data); // Debugging
        setActivities(response.data);
      } catch (error) {
        console.error("Error fetching recent activity:", error);
      }
    };

    fetchRecentActivity();
  }, []);

  return (
    <div className="activity-container">
      <div className="activity-header">
        <div className="btn-check">
          <button className="red"></button>
          <button className="yellow"></button>
          <button className="green"></button>
        </div>
        <h3>Recent activity</h3>
      </div>
      <div className="activity-list">
        <div className="title-letter">
          {activities.length > 0 ? (
            activities.map((activity, index) => (
              <div key={index} className="activity-item">
                <span className="title">
                  {activity.subject || "No Subject"}
                </span>
              </div>
            ))
          ) : (
            <p>No recent activities found.</p>
          )}
        </div>
        <div className="status">
          {activities.length > 0
            ? activities.map((activity, index) => (
                <div key={index}>
                  <span className={`status ${activity.status.toLowerCase()}`}>
                    {activity.status}
                  </span>
                </div>
              ))
            : null}
>>>>>>> 681ebe022d83b6eaaa5e73661a60bcc928628a78
        </div>
      </div>
    </div>
  );
};

export default RecentActivity;
