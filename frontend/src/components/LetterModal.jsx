import React, { useState, useEffect } from "react";

const LetterModal = ({ isOpen, onClose, letterData, onApprove, onReject }) => {
  const [actionStatus, setActionStatus] = useState(""); // "approved" | "rejected" | ""
  const [rejectionReason, setRejectionReason] = useState("");

  useEffect(() => {
    if (isOpen) {
      setActionStatus("");
      setRejectionReason("");
    }
  }, [isOpen]);

  const handleApprove = () => {
    onApprove();
    setActionStatus("approved");
    setTimeout(() => {
      onClose();
    }, 1500);
  };

  const handleReject = () => {
    if (!rejectionReason.trim()) {
      alert("Please provide a rejection reason.");
      return;
    }

    onReject(rejectionReason);
    setActionStatus("rejected");
    setTimeout(() => {
      onClose();
    }, 1500);
  };

  if (!isOpen || !letterData) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-lg p-6 relative animate-fade-in">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl"
          onClick={onClose}
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center text-red-500">
          Letter Details
        </h2>

        {actionStatus ? (
          <div className="flex flex-col items-center justify-center h-48">
            <p
              className={`text-lg font-semibold ${
                actionStatus === "approved"
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {actionStatus === "approved"
                ? "Letter Approved ✅"
                : "Letter Rejected ❌"}
            </p>
            <p className="text-gray-500 text-sm mt-2">Closing shortly...</p>
          </div>
        ) : (
          <>
            <div className="space-y-4 text-gray-700">
              <div className="flex justify-between">
                <span className="font-semibold">Student Name:</span>
                <span>{letterData.studentName}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Roll Number:</span>
                <span>{letterData.rollNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Department:</span>
                <span>{letterData.department}</span>
              </div>
              <div>
                <span className="font-semibold">Reason:</span>
                <p className="bg-gray-100 p-3 rounded mt-1 text-sm leading-relaxed">
                  {letterData.reason}
                </p>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">From Date:</span>
                <span>{letterData.fromDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">To Date:</span>
                <span>{letterData.toDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Leave Type:</span>
                <span>{letterData.leaveType}</span>
              </div>

              {/* Rejection Reason */}
              <div>
                <label className="font-semibold">Rejection Reason:</label>
                <textarea
                  className="w-full mt-1 p-2 border rounded"
                  rows={2}
                  placeholder="Enter reason for rejection"
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                />
              </div>
            </div>

            <div className="flex justify-end gap-4 mt-8">
              <button
                className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition"
                onClick={handleApprove}
              >
                Approve
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition"
                onClick={handleReject}
              >
                Reject
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LetterModal;
