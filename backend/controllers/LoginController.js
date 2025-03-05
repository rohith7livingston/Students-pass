const mongoose=require("mongoose");
const {registerSchemaModel} = require("./../Models/RegisterModel");

 
const LoginController= async(req, res) =>{
    try {
        console.log(req);
        const { regno, password} = req.query;
        console.log(" ",regno," ",password);

       // Check if the student with this Email or Regno already exists
        const existingStudent = await registerSchemaModel.findOne({ regno  });
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

module.exports={LoginController};