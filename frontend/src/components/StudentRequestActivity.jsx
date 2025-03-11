import React, { useEffect, useState } from "react";
import axios from "axios";

const StudentRequestActivity = () => {
  const [requests, setRequests] = useState([]);
  const [selectedLetter, setSelectedLetter] = useState(null);

  useEffect(() => {
    const fetchStudentRequests = async () => {
      try {
        const response = await axios.get("http://localhost:3000/getLetters");
        console.log("API Response:", response.data);
        setRequests(response.data.pendingRequests);
      } catch (error) {
        console.error("Error fetching student requests:", error);
      }
    };

    fetchStudentRequests();
  }, []);

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
        <button className="bg-gray-200 px-3 py-1 rounded">Sort</button>
      </div>

      {/* Request List */}
      <div className="flex flex-col gap-3">
        {requests.length > 0 ? (
          requests.map((request, index) => (
            <div
              key={index}
              className="bg-[#f7f7f7] p-4 rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-100 cursor-pointer flex flex-col sm:flex-row items-start sm:items-center w-full sm:w-[95%] lg:w-[85%] xl:w-[80%] mx-auto"
              onClick={() => setSelectedLetter(request)}
            >
              <span className="font-bold flex-1">{request.leaveType || "No Title"}</span>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full sm:w-auto mt-2 sm:mt-0">
                <button className="bg-green-500 text-white px-4 py-1 rounded w-full sm:w-24">
                  Approve
                </button>
                <button className="bg-red-500 text-white px-4 py-1 rounded w-full sm:w-24">
                  Reject
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No student requests found.</p>
        )}
      </div>

      {/* Show More Button */}
      <div className="text-center mt-4">
        <button className="text-red-500 font-bold">Show More</button>
      </div>

      {/* Letter Details Modal */}
      {selectedLetter && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl relative">
            <button
              onClick={() => setSelectedLetter(null)}
              className="absolute top-2 right-2 text-xl font-bold text-gray-600 hover:text-black"
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4">Letter Details</h2>
            <p><strong>Reg No:</strong> {selectedLetter.regno}</p>
            <p><strong>Subject:</strong> {selectedLetter.subject}</p>
            <p><strong>Message:</strong> {selectedLetter.message}</p>
            <p><strong>Status:</strong> {selectedLetter.status}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentRequestActivity;
