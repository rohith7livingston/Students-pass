import React, { useState } from "react";
import { motion } from "framer-motion";
import "./../stylesheet/ApplyLeave.css";

const ApplyLeave = () => {
  const [leaveType, setLeaveType] = useState("Sick"); // Store selected leave type
  const [dayType, setDayType] = useState("Full");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [subject, setSubject] = useState("");
  const [reason, setReason] = useState("");

  return (
    <div className="apply-leave-container">
      <div className="letter-opener">
        {/* Title */}
        <motion.h1
          className="text-3xl font-bold"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: -5 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Apply for Leave
        </motion.h1>

        {/* Animated Buttons */}
        <div className="button-animation">
          {["red-500", "yellow-500", "green-500"].map((color, index) => (
            <motion.button
              key={color}
              className={`circle-button bg-${color}`}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{
                duration: 1.2,
                delay: index * 0.2,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>

      {/* Form Section */}
      <div className="apply-form">
        <div className="form-1">
          {/* Leave Type Selection */}
          <div className="leavetype">
            <h2>Leave Type:</h2>
            <select
              className="leave-dropdown"
              value={leaveType}
              onChange={(e) => setLeaveType(e.target.value)}
            >
              <option value="Sick">Sick</option>
              <option value="Holiday">Holiday</option>
              <option value="Permission">Permission</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-semibold text-gray-700">Day Type</label>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  checked={dayType === "Full"}
                  onChange={() => setDayType("Full")}
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-gray-700">Full</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  checked={dayType === "Half"}
                  onChange={() => setDayType("Half")}
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-gray-700">Half Day</span>
              </label>
            </div>
          </div>
        </div>

        <div className="form-2"></div>
        <div className="form-3"></div>
        <div className="form-4"></div>
        <div className="form-5"></div>
      </div>
    </div>
  );
};

export default ApplyLeave;
