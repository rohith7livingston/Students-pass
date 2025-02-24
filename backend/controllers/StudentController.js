const studentModel = require("../Models/StudentModels");
const LetterModel = require("../Models/LetterModel");

// Student Registration
const registerStudent = async (req, res) => {
    try {
        const { Name, Email, Regno, Password, Branch, Hostler } = req.body;

        // Check if the student with this Email or Regno already exists
        const existingStudent = await studentModel.findOne({ $or: [{ Email }, { _id: Regno }] });
        if (existingStudent) {
            return res.status(400).json({ message: "Email or Register Number already registered" });
        }

        // Create a new student using Regno as _id
        const newStudent = new studentModel({
            _id: Regno, // Use Regno as MongoDB _id
            Name,
            Email,
            Password, // Password stored as plain text (not recommended for production)
            Branch,
            Hostler
        });

        // Save to the database
        await newStudent.save();

        res.status(201).json({ message: "Student registered successfully", student: newStudent });
    } catch (error) {
        console.error("Error registering student:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Apply for Leave
const applyLeave = async (req, res) => {
    try {
        const { studentId, leaveType, dayType, startDate, endDate, subject, reason } = req.body;

        // Check if student exists
        const student = await studentModel.findById(studentId);
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        // Validate date range
        if (new Date(startDate) > new Date(endDate)) {
            return res.status(400).json({ message: "End date must be after start date" });
        }

        // Create a new leave request
        const newLeave = new LetterModel({
            studentId,
            leaveType,
            dayType,
            startDate,
            endDate,
            subject,
            reason
        });

        // Save to database
        await newLeave.save();

        res.status(201).json({ message: "Leave request submitted successfully", leave: newLeave });
    } catch (error) {
        console.error("Error applying for leave:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Export all functions properly
module.exports = { registerStudent, applyLeave };
