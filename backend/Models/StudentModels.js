const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    _id: { type: String, required: true }, // Regno as _id
    fullname:{type:String,required:true},
    email:{type:String,required:true},
    regno:{type:String,required:true},
    password:{type:String,required:true},
    confirmpassword:{type:String,required:true},
    department:{
        type:String,
        default:" ",
        enum:["CSE","CSM","CSD","IT","CST","ECE","EEE","MECH","CIVIL"," "],
        required:true
    },
    hostler:{
        type:Boolean,
        default:false,
        required:true,
    }

}, { _id: false }); // Disable default ObjectId generation



const studentModel = mongoose.model("Student", studentSchema);

module.exports = {studentModel};
