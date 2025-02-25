
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

        </div>
      </div>
    </div>
  );
};

export default RecentActivity;
