const mongoose=require("mongoose");
const {registerSchemaModel} = require("./../Models/RegisterModel");

 
const SignUpController= async(req, res) =>{
    try {
        console.log(req);
        const { fullname, email, regno, password, confirmpassword} = req.body;
        console.log(fullname," ",email," ",regno," ",password," ",confirmpassword);

       // Check if the student with this Email or Regno already exists
        // const existingStudent = await registerSchemaModel.findOne({ $or: [{ email }, { regno }] });
        // if (existingStudent) 
        // {
        //     return res.status(400).json({ message: "Email or Register Number already registered" });
        // } 

        //Create a new student using Regno as _id
        const newStudent = new registerSchemaModel({
            // Use Regno as MongoDB _id
            fullname, 
            email,
            regno,
            password, // Password stored as plain text (not recommended for production)
            confirmpassword
        });

        //Save to the database
        await newStudent.save();

        res.status(201).json({ message: "Student registered successfully", student: newStudent });
    } catch (error) {
        console.error("Error registering student:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};



module.exports={SignUpController};