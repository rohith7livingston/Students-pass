const express = require("express");
const cors = require("cors"); // Import CORS
const { registerStudent, applyLeave, getStudentLeaves } = require("./controllers/StudentController");
const {SignUpController} = require("./controllers/SignUpController");
const {LoginController}=require("./controllers/LoginController");
const app = express();

app.use(cors()); // 
app.use(express.json());

app.post("/register", SignUpController);
app.post("/applyLeave", applyLeave);
app.get("/getLeave/:regno", getStudentLeaves);
app.get("/login",LoginController); // Corrected

module.exports = { app };
