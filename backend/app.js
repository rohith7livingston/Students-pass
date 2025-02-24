let express = require("express")
let {registerStudent} = require("./controllers/StudentController")
let {applyLeave} = require("./controllers/StudentController")
let app = express();

app.use(express.json())

app.post("/register",registerStudent)
app.post("/applyLeave",applyLeave)
module.exports = {app}