let studentModel = require("../Models/StudentModels")


const registerStudent = async (req, res) => {
    try {
        const { Name, Email, Regno, Password, Branch, Hostler } = req.body;

        // Check if the student already exists
        const existingStudent = await Student.findOne({ Email });
        if (existingStudent) {
            return res.status(400).json({ message: "Email already registered" });
        }

        // Create a new student
        const newStudent = new Student({
            Name,
            Email,
            Regno,
            Password,
            Branch,
            Hostler
        });

        // Save to database
        await newStudent.save();

        res.status(201).json({ message: "Student registered successfully", student: newStudent });
    } catch (error) {
        console.error("Error registering student:", error);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { registerStudent };