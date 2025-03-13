const {studentModel} = require("../Models/StudentModels");
const {LetterModel} = require("../Models/LetterModel");
const sendMail = require("./../emailService")



const getLeavesData = async (req, res) => {
    try {
        const leaves = await LetterModel.find({}, { leaveType: 1, _id: 0 });

        // Convert array to an object with counts
        const leaveCounts = leaves.reduce((acc, curr) => {
            acc[curr.leaveType] = (acc[curr.leaveType] || 0) + 1;
            return acc;
        }, {});

        res.json(leaveCounts); // Send response to frontend
    } catch (error) {
        console.error("Error fetching leaves data:", error);
        res.status(500).json({ message: "Internal Server Error" }); // Send error response
    }
};





const registerStudent= async(req, res) =>{
    try {
        console.log(req);
        const { fullname, email, regno, password, confirmpassword,department,hostler} = req.body;
        console.log(fullname," ",email," ",regno," ",password," ",confirmpassword," ",department," ",hostler);

       // Check if the student with this Email or Regno already exists
        const existingStudent = await studentModel.findOne({ $or: [{ email }, { regno }] });
        if (existingStudent) 
        {
            return res.status(400).json({ message: "Email or Register Number already registered" });
        } 

        //Create a new student using Regno as _id
        const newStudent = new studentModel({
            // Use Regno as MongoDB _id
            _id:regno,
            fullname, 
            email,
            regno,
            password, // Password stored as plain text (not recommended for production)
            confirmpassword,
            department,
            hostler
        });
        console.log(newStudent);
        console.log("registration successfull");
        

        //Save to the database
        await newStudent.save();

        res.status(201).json({ message: "Student registered successfully", student: newStudent });
    } catch (error) {
        console.error("Error registering student:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};









//login
 
const LoginController = async (req, res) => {
    try {
        const { regno, password } = req.query;

        // Check if the student exists
        const existingStudent = await studentModel.findOne({ regno });

        if (!existingStudent) {
            console.log("No such account is found");
            return res.json({ status: "noaccount" });
        }

        // Check password
        if (existingStudent.password === password) {
            return res.json({
                status: "loginsuccess",
                email: existingStudent.email, // Sending email along with success response
            });
        } else {
            return res.json({ status: "passwordwrong" });
        }

    } catch (error) {
        console.error("Error logging student:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};










// Apply for Leave
const applyLeave = async (req, res) => {
    try {
        const { studentId, mailId, leaveType, dayType, startDate, endDate, subject, reason ,approvedBy } = req.body;

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
            mailId,
            leaveType,
            dayType,
            startDate,
            endDate,
            approvedBy,
            subject,
            reason
        });

        // Save to database
        await newLeave.save();

        res.status(201).json({ message: "Leave request submitted successfully", leave: newLeave });
    } catch (error) {
        console.error("Error applying for leave:", error);
    }
};


//getting student profile info
const getStudentProfileInfo = async (req, res) => {
    try {
        console.log(req.params.regno);
        const regno = req.params.regno;  // Use regno from URL params
        
        const studentinfo = await studentModel.find({ regno : regno });
  
        if (studentinfo.length === 0) {
            return res.status(404).json({ message: "No student  records found" });
        }
        console.log(studentinfo[0]);
        res.status(200).json(studentinfo[0]);
    } catch (error) {
        console.error("Error fetching student info:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}; 



//getting leaves
const getStudentLeaves = async (req, res) => {
    try {
        
        const regno = req.params.regno;  // Use regno from URL params
        
        const leaveLetters = await LetterModel.find({ studentId: regno }).sort({ createdAt: -1 });

        if (leaveLetters.length === 0) {
            return res.status(404).json({ message: "No leave records found" });
        }
        res.status(200).json(leaveLetters);
    } catch (error) {
        console.error("Error fetching leave records:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};



//aproving leaves
const approveLeave = async (req, res) => {
    try {
        const leaveId = req.params.id;
        const approver = req.body.approvedBy || "Admin"; // You can pass the approver in the body

        const updatedLeave = await LetterModel.findByIdAndUpdate(
            leaveId,
            {
                status: "Approved",
                approvedBy: approver,
                rejectionReason: ""
            },
            { new: true }
        );

        if (!updatedLeave) {
            return res.status(404).json({ message: "Leave request not found" });
        }

        res.status(200).json({
            message: "Leave request approved successfully",
            leave: updatedLeave
        });

        //sending mail
        await sendMail(
            updatedLeave.mailId, 
            "Leave Approved ✅", 
            `Hey there !! Hope you are doing Good, your leave request from ${updatedLeave.startDate} to ${updatedLeave.endDate} has been approved by ${approver}.`
        );
    } catch (error) {
        console.error("Error approving leave:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


//rejecting leaves
const rejectLeave = async (req, res) => {
    try {
        const leaveId = req.params.id;
        const { rejectionReason, rejectedBy } = req.body;

        if (!rejectionReason) {
            return res.status(400).json({ message: "Rejection reason is required" });
        }

        const updatedLeave = await LetterModel.findByIdAndUpdate(
            leaveId,
            {
                status: "Rejected",
                approvedBy: rejectedBy || "Admin",
                rejectionReason: rejectionReason
            },
            { new: true }
        );

        if (!updatedLeave) {
            return res.status(404).json({ message: "Leave request not found" });
        }

        res.status(200).json({
            message: "Leave request rejected successfully",
            leave: updatedLeave
        });

        //sending mail
        await sendMail(
            updatedLeave.mailId,
            "Leave Rejected ❌",
            `Hey there, your leave request from ${updatedLeave.startDate} to ${updatedLeave.endDate} has been rejected by ${rejectedBy || "Admin"}. Reason: ${rejectionReason}`
        );
    } catch (error) {
        console.error("Error rejecting leave:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
    
};


// Export all functions properly
module.exports = { registerStudent,applyLeave,getStudentLeaves,LoginController,getLeavesData,approveLeave,rejectLeave,getStudentProfileInfo};
