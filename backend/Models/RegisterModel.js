const mongoose=require("mongoose");




const registerSchema = new mongoose.Schema({
    fullname:{type:String,required:true},
    email:{type:String,required:true},
    regno:{type:String,required:true},
    password:{type:String,required:true},
    confirmpassword:{type:String,required:true}
})

const registerSchemaModel=mongoose.model("registereddata",registerSchema);


module.exports={registerSchemaModel}; 