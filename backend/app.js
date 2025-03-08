const express = require("express");
const cors = require("cors"); // Import CORS
const { registerStudent ,LoginController,applyLeave,getStudentLeaves} = require("./controllers/StudentController");
const { Adminlogin ,getPendingLeaveRequests } = require("./controllers/AdminController.js")
const app = express();

app.use(cors()); // 
app.use(express.json());

app.post("/register", registerStudent);
app.post("/applyleave", applyLeave);
app.get("/getLeave/:regno", getStudentLeaves);
app.get("/login",LoginController); // Corrected

app.post("/Adminlogin",Adminlogin)
app.get("/getLetters",getPendingLeaveRequests)

module.exports = { app };
