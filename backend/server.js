const {app} =require("./app.js");
const mongoose = require("mongoose")

mongoose.connect("mongodb+srv://Devisri123:devi+123@cluster0.vduzx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
        .then((req,res)=>
        {
            console.log("MangoDB connected");
        })
let port = 3000;
app.listen(port,(req,res)=>
{
    console.log(`Server is listening on port ${port}`);
    
})
