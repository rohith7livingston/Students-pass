import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { motion } from "framer-motion";
import axios from "axios";
import "./../stylesheet/ApplyLeave.css";
import { ToastContainer, toast } from "react-toastify";

const ApplyLeave = () => {
  const [leaveType, setLeaveType] = useState("Sick Leave");
  const [dayType, setDayType] = useState("Full Day");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [subject, setSubject] = useState("");
  const [reason, setReason] = useState("");
  const [approvedBy, setApprovedBy] = useState("CSEHOD");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); // Initialize navigate

  const user = JSON.parse(localStorage.getItem("user"));
  const regno = user?.regnoOrEmail;

  if (!regno) {
    toast.error("User not logged in. Please log in again.");
    return null;
  }

  const handleSubmit = async () => {
    if (!startDate || !endDate || !subject.trim() || !reason.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (new Date(startDate) > new Date(endDate)) {
      toast.error("End date must be after start date.");
      return;
    }

    setLoading(true);

    const requestData = {
      studentId: regno,
      leaveType,
      dayType,
      startDate,
      endDate,
      subject,
      reason,
      approvedBy,
    };

    try {
      const response = await axios.post("http://localhost:3000/applyLeave", requestData);
      toast.success(response.data.message || "Leave request submitted successfully!");

      // Reset form
      setLeaveType("Sick Leave");
      setDayType("Full Day");
      setStartDate("");
      setEndDate("");
      setSubject("");
      setReason("");
      setApprovedBy("CSE HOD");

      // Redirect to /student after success
      setTimeout(() => {
        navigate("/student");
      }, 2000); // 2 seconds delay for user to see the success message

    } catch (error) {
      console.error("Error submitting leave request:", error);
      toast.error(error.response?.data?.message || "Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-pink-100">
      <div className="w-full max-w-2xl p-6 bg-white rounded-xl shadow-md border border-dashed border-gray-500">
        {/* Title */}
        <div className="flex items-center gap-3 mb-4">
          <h1 className="text-2xl font-bold text-gray-800">Apply for leave</h1>
          <div className="flex space-x-1 dot-animation">
            <motion.div
              className="w-2.5 h-2.5 bg-red-500 rounded-full"
              animate={{ scale: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 1, ease: "easeInOut" }}
            />
            <motion.div
              className="w-2.5 h-2.5 bg-yellow-500 rounded-full"
              animate={{ scale: [0, 1, 0] }}
              transition={{
                repeat: Infinity,
                duration: 1,
                ease: "easeInOut",
                delay: 0.2,
              }}
            />
            <motion.div
              className="w-2.5 h-2.5 bg-green-500 rounded-full"
              animate={{ scale: [0, 1, 0] }}
              transition={{
                repeat: Infinity,
                duration: 1,
                ease: "easeInOut",
                delay: 0.4,
              }}
            />
          </div>
        </div>

        {/* Form */}
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <label className="text-gray-700 font-semibold">Leave type</label>
            <select
              className="p-2 border border-gray-300 rounded-lg focus:ring focus:ring-red-300"
              value={leaveType}
              onChange={(e) => setLeaveType(e.target.value)}
            >
              <option value="Sick Leave">Sick Leave</option>
              <option value="Leave">Leave</option>
              <option value="Permission">Permission</option>
            </select>
          </div>

          <div className="flex items-center gap-4">
            <label className="text-gray-700 font-semibold">Day type</label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                checked={dayType === "Full Day"}
                onChange={() => setDayType("Full Day")}
                className="w-4 h-4 text-red-600 focus:ring-red-500"
              />
              <span className="text-gray-700">Full Day</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                checked={dayType === "Half Day"}
                onChange={() => setDayType("Half Day")}
                className="w-4 h-4 text-red-600 focus:ring-red-500"
              />
              <span className="text-gray-700">Half Day</span>
            </label>
          </div>

          <div className="flex justify-between gap-4">
            <div className="flex flex-col flex-1">
              <label className="text-gray-700 font-semibold">From:</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="p-2 border border-gray-300 rounded-lg focus:ring focus:ring-red-300"
              />
            </div>
            <div className="flex flex-col flex-1">
              <label className="text-gray-700 font-semibold">To:</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="p-2 border border-gray-300 rounded-lg focus:ring focus:ring-red-300"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <label className="text-gray-700 font-semibold">Approve By</label>
            <select
              className="p-2 border border-gray-300 rounded-lg focus:ring focus:ring-red-300"
              value={approvedBy}
              onChange={(e) => setApprovedBy(e.target.value)}
            >
              <option value="CSEHOD">CSE HOD</option>
              <option value="Warden">Warden</option>
              <option value="Principal">Principal</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-gray-700 font-semibold">Subject:</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="p-2 border border-gray-300 rounded-lg focus:ring focus:ring-red-300"
            />
            <label className="text-gray-700 font-semibold">Reason:</label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="p-2 border border-gray-300 rounded-lg focus:ring focus:ring-red-300"
              rows="3"
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`w-full p-3 ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-red-500 hover:bg-red-600"
            } text-white rounded-lg font-semibold transition duration-300`}
          >
            {loading ? "Submitting..." : "Apply Leave"}
          </button>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default ApplyLeave;
