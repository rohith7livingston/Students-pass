const express = require("express");
const cors = require("cors"); // Import CORS
const { registerStudent, applyLeave, getStudentLeaves } = require("./controllers/StudentController");

const app = express();

app.use(cors()); // 
app.use(express.json());

app.post("/register", registerStudent);
app.post("/applyLeave", applyLeave);
app.get("/getLeave/:regno", getStudentLeaves); // Corrected

module.exports = { app };
