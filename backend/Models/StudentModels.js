const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    _id: { type: String, required: true }, // Regno as _id
    Name: { type: String },
    Email: { type: String, required: true, unique: true },
    Password: { type: String, required: true },
    Branch: { type: String },
    Hostler: { type: Boolean }
}, { _id: false }); // Disable default ObjectId generation

const studentModel = mongoose.model("Student", studentSchema);
module.exports = studentModel;
