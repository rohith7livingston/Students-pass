const mongoose = require("mongoose");

const LetterSchema = new mongoose.Schema({
    studentId: { 
        type: String, 
        ref: "Student", // Reference to Student Model
        required: true 
    },
    mailId :
    {
        type:String,
        required:true
    },
    leaveType: { 
        type: String, 
        enum: ["Leave", "Sick Leave", "Permission","Outing"], 
        required: true 
    },
    dayType: { 
        type: String, 
        enum: ["Full Day", "Half Day", "Short Leave"], 
        required: true 
    },
    startDate: { 
        type: String, 
        required: true 
    },
    endDate: { 
        type: String, 
        required: true 
    },
    approvedBy: { 
        type: String, 
        default: "Pending" 
    },
    subject: { 
        type: String, 
        required: true 
    },
    reason: { 
        type: String, 
        required: true 
    },
    status: { 
        type: String, 
        enum: ["Pending", "Approved", "Rejected"], 
        default: "Pending" 
    },
    rejectionReason: { 
        type: String, 
        default: "" 
    }
}, { timestamps: true }); // Adds createdAt and updatedAt fields

const LetterModel = mongoose.model("Leave", LetterSchema);
module.exports = {LetterModel};
