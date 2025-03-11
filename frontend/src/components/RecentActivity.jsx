import React, { useEffect, useState } from "react";
import axios from "axios";

const RecentActivity = ({ limit = 5 }) => {
  const [activities, setActivities] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [regno, setRegno] = useState("");

  useEffect(() => {
    // Fetch user registration number from local storage
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser?.regnoOrEmail) {
      setRegno(storedUser.regnoOrEmail);
    }
  }, []);

  useEffect(() => {
    const fetchRecentActivity = async () => {
      if (!regno) return; // Prevent API call if regno is empty

      try {
        const response = await axios.get(
          `http://localhost:3000/getLeave/${regno}`
        );
        console.log("API Response:", response.data);
        setActivities(response.data);
      } catch (error) {
        console.error("Error fetching recent activity:", error);
      }
    };

    fetchRecentActivity();
  }, [regno]); // Fetch data when `regno` is updated

  // Limit displayed activities based on `showMore` state
  const displayedActivities = showMore
    ? activities
    : activities.slice(0, limit);

  return (
    <div className="bg-white rounded-lg shadow-md p-5 w-full max-w-[800px] mx-auto">
      {/* Header Section */}
      <div className="flex justify-between items-center border-b border-gray-300 pb-2 mb-4">
        <div className="flex gap-2">
          <button className="w-4 h-4 bg-red-500 rounded-full"></button>
          <button className="w-4 h-4 bg-yellow-500 rounded-full"></button>
          <button className="w-4 h-4 bg-green-500 rounded-full"></button>
        </div>
        <h3 className="text-lg font-semibold text-gray-800">Recent Activity</h3>
      </div>

      {/* Activity List */}
      <div className="flex flex-col gap-3">
        {displayedActivities.length > 0 ? (
          displayedActivities.map((activity, index) => (
            <div
              key={index}
              className="flex justify-between items-center bg-gray-100 p-3 rounded-md border border-gray-200"
            >
              {/* Leave Request Title */}
              <span className="font-medium text-gray-900 flex-1">
                {activity.subject || "No Subject"}
              </span>

              {/* Status Badge */}
              <span
                className={`px-3 py-1.5 rounded-md text-white font-bold text-center min-w-[90px] text-sm ${
                  activity.status.toLowerCase() === "approved"
                    ? "bg-green-600"
                    : activity.status.toLowerCase() === "rejected"
                    ? "bg-red-600"
                    : "bg-yellow-500"
                }`}
              >
                {activity.status}
              </span>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">
            No recent activities found.
          </p>
        )}
      </div>

      {/* Show More / Show Less Button */}
      {activities.length > limit && (
        <button
          onClick={() => setShowMore(!showMore)}
          className="mt-3 px-3 py-2 text-red-600 font-medium rounded-lg w-full hover:bg-red-100 transition-all"
        >
          {showMore ? "Show Less" : "Show More"}
        </button>
      )}
    </div>
  );
};

export default RecentActivity;
