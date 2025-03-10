import React, { useState, useEffect } from "react";
import axios from "axios";

const StudentRequestActivity = ({ onLetterClick }) => {
  const [requests, setRequests] = useState([]);

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
    <div className="bg-white rounded-lg shadow-md p-6 w-full">
      <h3 className="text-xl font-bold text-gray-800 border-b-2 pb-3 mb-5">
        Student Requests
      </h3>

      <div className="flex flex-col gap-4">
        {requests.length > 0 ? (
          requests.map((request, index) => (
            <div
              key={index}
              className="bg-gray-100 p-4 rounded-lg hover:shadow transition duration-300 cursor-pointer"
              onClick={() => onLetterClick(request)}
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold text-gray-800">
                    {request.subject || "No Subject"}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    {request.message || "No Message"}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
                  >
                    Approve
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No student requests found.</p>
        )}
      </div>

      <div className="flex justify-center mt-6">
        <button className="text-red-500 hover:text-red-700 font-semibold">
          Show More
        </button>
      </div>
    </div>
  );
};

export default StudentRequestActivity;
