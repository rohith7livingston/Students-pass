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
        </div>
      </div>
    </div>
  );
};

export default RecentActivity;
