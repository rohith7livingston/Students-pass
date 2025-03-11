const {app} =require("./app.js");
const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/Helloworld")
        .then((req,res)=>
        {
            console.log("MangoDB connected");
        })
let port = 3000;
app.listen(port,(req,res)=>
{
    console.log(`Server is listening on port ${port}`);
    
})
