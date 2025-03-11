import React, { useEffect, useState } from "react";
import axios from "axios";
import LetterModal from "./LetterModal"; // Correct import path

const StudentRequestActivity = () => {
  const [requests, setRequests] = useState([]);
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch student requests
  const fetchStudentRequests = async () => {
    try {
      const response = await axios.get("http://localhost:3000/getLetters");
      console.log("API Response:", response.data);
      setRequests(response.data.pendingRequests || []);
    } catch (error) {
      console.error("Error fetching student requests:", error);
    }
  };

  useEffect(() => {
    fetchStudentRequests();
  }, []);

  // Approve letter
 // Approve letter
const handleApprove = async (letter) => {
  try {
    setLoading(true);
    await axios.post(`http://localhost:3000/approveLeave/${letter._id}`, {
      approvedBy: "Your Name",
    });
    setRequests((prev) => prev.filter((req) => req._id !== letter._id));
    setModalOpen(false);
    alert("Letter approved ✅");
  } catch (error) {
    console.error("Error approving letter:", error);
  } finally {
    setLoading(false);
  }
};

// Reject letter with reason
const handleReject = async (letter, reason) => {
  try {
    setLoading(true);
    await axios.post(`http://localhost:3000/rejectLeave/${letter._id}`, {
      rejectionReason: reason,
      rejectedBy: "Your Name",
    });
    setRequests((prev) => prev.filter((req) => req._id !== letter._id));
    setModalOpen(false);
    alert("Letter rejected ❌");
  } catch (error) {
    console.error("Error rejecting letter:", error);
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="bg-white rounded-lg shadow-md p-5 w-full max-w-4xl mx-auto">
      {/* Window Header */}
      <div className="flex justify-between items-center border-b-2 border-gray-300 pb-2 mb-4">
        <div className="flex gap-2">
          <button className="w-4 h-4 bg-red-500 rounded-full border-none animate-pulse"></button>
          <button className="w-4 h-4 bg-yellow-500 rounded-full border-none animate-pulse delay-100"></button>
          <button className="w-4 h-4 bg-green-500 rounded-full border-none animate-pulse delay-200"></button>
        </div>
        <h3 className="text-lg font-bold">Student Requests</h3>
        <button
          className="bg-gray-200 px-3 py-1 rounded"
          onClick={fetchStudentRequests}
        >
          Refresh
        </button>
      </div>

      {/* Request List */}
      <div className="flex flex-col gap-3">
        {requests.length > 0 ? (
          requests.map((request) => (
            <div
              key={request._id}
              className="bg-[#f7f7f7] p-4 rounded-lg transition-all duration-300 hover:shadow-lg cursor-pointer flex flex-col sm:flex-row items-start sm:items-center w-full mx-auto"
              onClick={() => {
                setSelectedLetter(request);
                setModalOpen(true);
              }}
            >
              {/* Request Title */}
              <span className="font-bold flex-1">
                {request.subject || "No Title"}
              </span>

              {/* Buttons Container */}
              <div
                className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full sm:w-auto mt-2 sm:mt-0"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  disabled={loading}
                  className={`${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                  } bg-green-500 text-white px-4 py-1 rounded w-full sm:w-24`}
                  onClick={() => handleApprove(request)}
                >
                  Approve
                </button>
                <button
                  disabled={loading}
                  className={`${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                  } bg-red-500 text-white px-4 py-1 rounded w-full sm:w-24`}
                  onClick={() => {
                    setSelectedLetter(request);
                    setModalOpen(true);
                  }}
                >
                  Reject
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No student requests found.</p>
        )}
      </div>

      {/* Letter Modal */}
      {selectedLetter && (
        <LetterModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          letterData={{
            studentName: selectedLetter.studentName,
            rollNumber: selectedLetter.studentId,
            department: selectedLetter.department,
            reason: selectedLetter.reason,
            fromDate: selectedLetter.startDate,
            toDate: selectedLetter.endDate,
            leaveType: selectedLetter.leaveType,
          }}
          onApprove={() => handleApprove(selectedLetter)}
          onReject={(reason) => handleReject(selectedLetter, reason)}
        />
      )}
    </div>
  );
};

export default StudentRequestActivity;
