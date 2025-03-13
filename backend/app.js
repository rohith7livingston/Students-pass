const express = require("express");
const cors = require("cors"); // Import CORS
const { registerStudent ,LoginController,applyLeave,getStudentLeaves,getLeavesData,approveLeave,rejectLeave,getStudentProfileInfo} = require("./controllers/StudentController");
const { Adminlogin ,getPendingLeaveRequests } = require("./controllers/AdminController.js")
const app = express();

app.use(cors()); // 
app.use(express.json());


app.post("/register", registerStudent);
app.post("/applyleave", applyLeave);
app.get("/getLeave/:regno", getStudentLeaves);
app.get("/login",LoginController); // Corrected
app.get("/getleavesdata",getLeavesData);
app.post("/Adminlogin",Adminlogin)
app.get("/getLetters",getPendingLeaveRequests)
app.post("/approveLeave/:id",approveLeave)
app.post("/rejectLeave/:id",rejectLeave)
app.get("/getstudentinfo/:regno",getStudentProfileInfo);
module.exports = { app };
