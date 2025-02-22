let {app} = require("./app")
let mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/Testing")
        .then((req,res)=>
        {
            console.log("MangoDB connected");
        })
let port = 5000;
app.listen(port,(req,res)=>
{
    console.log("Server is listening on port 5000");
    
})
