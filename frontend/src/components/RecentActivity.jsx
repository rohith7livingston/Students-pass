import React from "react";
import "./../stylesheet/RecentActivity.css";

const RecentActivity = () => {
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

    { title: "Title of the letter", status: "Approved", className: "approved" },
  ];

  return (
    <div className="activity-container">
      <div className="activity-header">
        <h3>Recent activity</h3>
      </div>
      <div className="activity-list">
        <div className="title-letter">
          {activities.map((activity, index) => (
            <div className="activity-item">
              <div>
                <span className="title">{activity.title}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="status">
          {activities.map((activity, index) => (
            <div>
              <div>
                <span className={`status ${activity.className}`}>
                  {activity.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentActivity;
