// adminController.js

const { adminDocuments } = require("./Admins.js"); // Mock database
const { LetterModel } = require("./../Models/LetterModel.js"); // Importing the leave model

// Admin Login
// Admin Login
const Adminlogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = adminDocuments.find((admin) => admin.email === email);

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Password verification
    if (password === admin.password) {
      return res.status(200).json({
        message: "Login successful",
        admin: {
          name: admin.name,
          email: admin.email,
          role: admin.role, // Include role in response
        },
      });
    } else {
      return res.status(401).json({ message: "Invalid password" });
    }
  } catch (error) {
    console.error("Error logging in admin:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
// Fetch Pending Leave Requests






const getPendingLeaveRequests = async (req, res) => {
  try {
    const role = req.query.role; // Get admin role from query params

    if (!role) {
      return res.status(401).json({ message: "Unauthorized. Please log in." });
    }

    // Fetch only pending leave requests for this admin
    const pendingRequests = await LetterModel.find({
      status: "Pending",
      approvedBy: role,
    });

    // Fetch total counts for approved, rejected, and pending leaves
    const approvedCount = await LetterModel.countDocuments({
      status: "Approved",
      approvedBy: role,
    });
    const rejectedCount = await LetterModel.countDocuments({
      status: "Rejected",
      approvedBy: role,
    });
    const pendingCount = pendingRequests.length;

    if (pendingRequests.length === 0) {
      return res.status(404).json({ message: "No pending leave requests found" });
    }

    // Count different leave types
    const leaveTypeCounts = {
      Permission: 0,
      "Sick Leave": 0,
      Leave: 0,
    };

    pendingRequests.forEach((request) => {
      if (leaveTypeCounts.hasOwnProperty(request.leaveType)) {
        leaveTypeCounts[request.leaveType]++;
      }
    });

    res.status(200).json({
      pendingRequests, 
      leaveTypeCounts,
      approved: approvedCount,
      rejected: rejectedCount,
      pending: pendingCount,
    });
  } catch (error) {
    console.error("NO Leaves Found:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};










// Approve Leave Request
const approveLeaveRequest = async (req, res) => {
  try {
    const { leaveId, adminEmail } = req.body;

    // Find the leave request by ID
    const leaveRequest = await LetterModel.findById(leaveId);

    if (!leaveRequest) {
      return res.status(404).json({ message: "Leave request not found" });
    }

    // Update the leave request status to approved
    leaveRequest.status = "Approved";
    leaveRequest.approvedBy = adminEmail;

    await leaveRequest.save();

    res
      .status(200)
      .json({ message: "Leave request approved successfully", leaveRequest });
  } catch (error) {
    console.error("Error approving leave request:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Reject Leave Request
const rejectLeaveRequest = async (req, res) => {
  try {
    const { leaveId, adminEmail, rejectionReason } = req.body;

    // Find the leave request by ID
    const leaveRequest = await LetterModel.findById(leaveId);

    if (!leaveRequest) {
      return res.status(404).json({ message: "Leave request not found" });
    }

    // Update the leave request status to rejected
    leaveRequest.status = "Rejected";
    leaveRequest.approvedBy = adminEmail;
    leaveRequest.rejectionReason = rejectionReason;

    await leaveRequest.save();

    res
      .status(200)
      .json({ message: "Leave request rejected successfully", leaveRequest });
  } catch (error) {
    console.error("Error rejecting leave request:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { Adminlogin, getPendingLeaveRequests };
