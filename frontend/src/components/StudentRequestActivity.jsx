import React, { useEffect, useState } from "react";
import axios from "axios";
import LetterModal from "./LetterModal";

// Toastify imports
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StudentRequestActivity = () => {
  const [requests, setRequests] = useState([]);
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserRole(parsedUser.role);
      fetchStudentRequests(parsedUser.role);
    } else {
      toast.warn("You need to log in.", { autoClose: 3000 });
    }
  }, []);

  const fetchStudentRequests = async (role) => {
    if (!role) {
      toast.error("User role not found. Please log in again.", { autoClose: 3000 });
      return;
    }

    try {
      setLoading(true);

      const response = await axios.get(
        `http://localhost:3000/getLetters?role=${role}`
      );

      if (response.status === 200) {
        const pendingRequests = response.data.pendingRequests || [];
        setRequests(pendingRequests);

        if (pendingRequests.length === 0) {
          toast.info("No student requests found.", { autoClose: 2000 });
        } else {
          toast.success("Requests fetched successfully ✅", { autoClose: 2000 });
        }
      } else {
        toast.error("Unexpected response status. Please try again.", { autoClose: 3000 });
      }
    } catch (error) {
      console.error("Error fetching student requests:", error);
      toast.error("Failed to fetch student requests ❌", { autoClose: 3000 });
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (letter) => {
    try {
      setLoading(true);

      await axios.post(`http://localhost:3000/approveLeave/${letter._id}`, {
        approvedBy: userRole,
      });

      setRequests((prev) => prev.filter((req) => req._id !== letter._id));
      setModalOpen(false);

      toast.success("Letter approved ✅", { autoClose: 2000 });
    } catch (error) {
      console.error("Error approving letter:", error);
      toast.error("Failed to approve the letter ❌", { autoClose: 3000 });
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async (letter, reason) => {
    try {
      setLoading(true);

      await axios.post(`http://localhost:3000/rejectLeave/${letter._id}`, {
        rejectionReason: reason,
        rejectedBy: userRole,
      });

      setRequests((prev) => prev.filter((req) => req._id !== letter._id));
      setModalOpen(false);

      toast.success("Letter rejected ❌", { autoClose: 2000 });
    } catch (error) {
      console.error("Error rejecting letter:", error);
      toast.error("Failed to reject the letter ❌", { autoClose: 3000 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-5 w-full max-w-4xl mx-auto">
      {/* ToastContainer renders the toasts */}
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      {/* Header */}
      <div className="flex justify-between items-center border-b-2 border-gray-300 pb-2 mb-4">
        <h3 className="text-lg font-bold">Student Requests</h3>
        <button
          disabled={loading}
          className={`${
            loading
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-gray-300 transition"
          } bg-gray-200 px-3 py-1 rounded`}
          onClick={() => fetchStudentRequests(userRole)}
        >
          {loading ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      {/* Requests List */}
      <div className="flex flex-col gap-3">
        {loading && requests.length === 0 ? (
          <p>Loading requests...</p>
        ) : requests.length > 0 ? (
          requests.map((request) => (
            <div
              key={request._id}
              className="bg-[#f7f7f7] p-4 rounded-lg transition-all duration-300 hover:shadow-lg cursor-pointer flex flex-col sm:flex-row items-start sm:items-center w-full mx-auto"
              onClick={() => {
                setSelectedLetter(request);
                setModalOpen(true);
              }}
            >
              <span className="font-bold flex-1">
                {request.subject || "No Title"}
              </span>

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
            mailId: selectedLetter.mailId,
            rollNumber: selectedLetter.studentId,
            // department: selectedLetter.department,
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
