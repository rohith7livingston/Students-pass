const express = require("express");
const cors = require("cors"); // Import CORS
const { registerStudent, applyLeave, getStudentLeaves } = require("./controllers/StudentController");
const {SignUpController} = require("./controllers/SignUpController");
const {LoginController}=require("./controllers/LoginController");
const app = express();

app.use(cors()); // 
app.use(express.json());

<<<<<<< HEAD
app.post("/register", registerStudent);


=======
app.post("/register", SignUpController);
>>>>>>> a5f8b5d02ad7cc555311afaab58349b07843a0ea
app.post("/applyLeave", applyLeave);
app.get("/getLeave/:regno", getStudentLeaves);
app.get("/login",LoginController); // Corrected

module.exports = { app };
