import React, { useState } from "react";

const LeaveRequestModal = ({ isOpen, onClose, onApprove, onReject, student, width = "max-w-2xl" }) => {
  const [reason, setReason] = useState(student?.message || "");

  if (!isOpen || !student) return null;

  const handleReasonChange = (e) => {
    setReason(e.target.value);
  };

  const handleOutsideClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center transition-opacity duration-300"
      onClick={handleOutsideClick}
    >
      <div
        className={`bg-white rounded-lg p-6 w-full ${width} max-h-[80vh] overflow-y-auto shadow-lg transform transition-all duration-300`}
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Leave Request</h2>

        <div className="space-y-6">
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">Student ID:</label>
            <p className="border border-gray-300 rounded-md px-4 py-2 text-gray-600">{student.regno}</p>
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">Leave Type:</label>
            <p className="border border-gray-300 rounded-md px-4 py-2 text-gray-600">{student.leaveType || "Sick"}</p>
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">From:</label>
            <p className="border border-gray-300 rounded-md px-4 py-2 text-gray-600">{student.startDate || "Select start date"}</p>
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">To:</label>
            <p className="border border-gray-300 rounded-md px-4 py-2 text-gray-600">{student.endDate || "Select ending date"}</p>
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">Subject:</label>
            <p className="border border-gray-300 rounded-md px-4 py-2 text-gray-600">{student.subject || "No Subject"}</p>
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">Reason:</label>
            <textarea
              className="border border-gray-300 rounded-md px-4 py-3 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 resize-none"
              rows="4"
              value={reason}
              onChange={handleReasonChange}
              placeholder="Enter reason for leave"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">No of Leaves Approved This Month:</label>
            <p className="border border-gray-300 rounded-md px-4 py-2 text-gray-600">{student.leavesApproved || "7"}</p>
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <button
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-md transition duration-200 transform hover:scale-105"
              onClick={() => onApprove(reason)}
            >
              Approve
            </button>
            <button
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-md transition duration-200 transform hover:scale-105"
              onClick={onReject}
            >
              Reject
            </button>
            <button
              className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-md transition duration-200 transform hover:scale-105"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaveRequestModal;
