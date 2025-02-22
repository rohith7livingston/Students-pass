let express = require("express")
let {registerStudent} = require("./controllers/StudentController")
let app = express();

app.use(express.json())

app.post("/register",registerStudent)

module.exports = {app}