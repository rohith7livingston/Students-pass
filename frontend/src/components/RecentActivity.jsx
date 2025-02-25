import React, { useEffect, useState } from "react";
import axios from "axios";

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
    <div className="bg-white rounded-lg shadow-md p-5 w-[800px]">
      <div className="flex justify-between items-center border-b-2 border-gray-300 pb-2 mb-4">
        <div className="flex gap-2">
          <button className="w-4 h-4 bg-red-500 rounded-full border-none"></button>
          <button className="w-4 h-4 bg-yellow-500 rounded-full border-none"></button>
          <button className="w-4 h-4 bg-green-500 rounded-full border-none"></button>
        </div>
        <h3 className="text-lg font-bold">Recent activity</h3>
      </div>
      <div className="flex gap-4">
        <div className="w-4/5 flex flex-col gap-2">
          {activities.length > 0 ? (
            activities.map((activity, index) => (
              <div key={index} className="bg-gray-200 p-3 rounded-md">
                <span className="font-bold">
                  {activity.subject || "No Subject"}
                </span>
              </div>
            ))
          ) : (
            <p>No recent activities found.</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          {activities.length > 0 &&
            activities.map((activity, index) => (
              <span
                key={index}
                className={`px-3 py-1 rounded-md text-white font-bold text-center ${
                  activity.status.toLowerCase() === "approved"
                    ? "bg-green-600"
                    : activity.status.toLowerCase() === "rejected"
                    ? "bg-red-600"
                    : "bg-yellow-500"
                }`}
              >
                {activity.status}
              </span>
            ))}
        </div>
      </div>
    </div>
  );
};

export default RecentActivity;
