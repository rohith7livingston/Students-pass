const {studentModel} = require("../Models/StudentModels");
const {LetterModel} = require("../Models/LetterModel");





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
 
const LoginController= async(req, res) =>{
    try {
        console.log(req);
        const { regno, password} = req.query;
        console.log(" ",regno," ",password);

       // Check if the student with this Email or Regno already exists
        const existingStudent = await studentModel.findOne({ regno  });
        if (! existingStudent) 
        {
           console.log("no such account is found");
           res.json("noaccount");

        }
    else
    {
        if(existingStudent.password===password)
        {
            
            res.json("loginsuccess");
        }
        else
        {
            res.json("passwordwrong");
        }
    } 

     } catch (error) {
        console.error("Error logging student:", error);
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
    }
};


//getting leaves
//getting leaves
const getStudentLeaves = async (req, res) => {
    try {
        const regno = req.params.regno;  // Use regno from URL params

        const leaveLetters = await LetterModel.find({ studentId: regno });

        if (leaveLetters.length === 0) {
            return res.status(404).json({ message: "No leave records found" });
        }

        res.status(200).json(leaveLetters);
    } catch (error) {
        console.error("Error fetching leave records:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};



// Export all functions properly
module.exports = { registerStudent,applyLeave,getStudentLeaves,LoginController,getLeavesData};
