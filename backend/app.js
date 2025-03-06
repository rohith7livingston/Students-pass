const express = require("express");
const cors = require("cors"); // Import CORS
const { registerStudent} = require("./controllers/StudentController");
const { LoginController } = require("./controllers/LoginController") ;
const {applyLeave} = require("./controllers/StudentController");
const {getStudentLeaves} = require("./controllers/StudentController");
const app = express();

app.use(cors()); // 
app.use(express.json());

app.post("/register", registerStudent);
app.post("/applyleave", applyLeave);
app.get("/getLeave/", getStudentLeaves);
app.get("/login",LoginController); // Corrected

module.exports = { app };
