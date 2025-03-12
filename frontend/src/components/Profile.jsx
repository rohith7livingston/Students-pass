import React, { useState, useEffect } from "react";
import axios from "axios";
import { X } from "lucide-react"; // Import close icon from Lucide React

const Profile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activities, setActivities] = useState([]);
  const [regno, setRegno] = useState("");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser?.regnoOrEmail) {
      setRegno(storedUser.regnoOrEmail);
    }
  }, []);

  useEffect(() => {
    const fetchRecentActivity = async () => {
      if (!regno) return;
      try {
        alert(`The register number I got is ${regno}`);
        const response = await axios.get(
          `http://localhost:3000/getstudentinfo/${regno}`
        );
        console.log("API Response of logged student:", response.data);
        setActivities(response.data);
      } catch (error) {
        console.error("Error fetching recent activity:", error);
      }
    };
    fetchRecentActivity();
  }, [regno]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <button
        className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition duration-300"
        onClick={() => setIsOpen(true)}
      >
        View Profile
      </button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md relative">
            {/* Close Button (X) on top right */}
            <button
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 transition duration-200"
              onClick={() => setIsOpen(false)}
            >
              <X size={24} />
            </button>

            <h2 className="text-2xl font-bold mb-4 text-center text-white-800">
              Profile Details
            </h2>
            <div className="border-t border-gray-300 my-4"></div>

            <div className="space-y-3">
              <ProfileDetail label="Name" value={activities.fullname} />
              <ProfileDetail label="Reg No" value={activities.regno} />
              <ProfileDetail label="Email" value={activities.email} />
              <ProfileDetail label="Department" value={activities.department} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Reusable Profile Detail Component
const ProfileDetail = ({ label, value }) => {
  return (
    <div className="flex justify-between items-center bg-gray-100 p-3 rounded-lg">
      <span className="font-medium text-gray-700">{label}:</span>
      <span className="text-gray-900 font-semibold">{value || "N/A"}</span>
    </div>
  );
};

export default Profile;
