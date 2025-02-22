let  mongoose = require("mongoose")

const studentSchema = new mongoose.Schema({
    Name: { type: String},
    Email: { type: String, required: true, unique: true },
    Regno : { type: String, required: true, unique: true },
    Password: { type: String, required: true },
    Branch: { type: String},
    Hostler : {type:Boolean}
})

const studentModel = mongoose.model("student",studentSchema);
module.exports  = studentModel;