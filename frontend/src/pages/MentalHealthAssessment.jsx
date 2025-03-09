import React, { useState } from "react";
import axios from "axios";

const MentalHealthAssessment = ({ show, handleClose }) => {
  const [showQuestions, setShowQuestions] = useState(false);
  const [step, setStep] = useState(1);
  const [showSubmit, setShowSubmit] = useState(false);
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    regno: "",
    password: "",
    confirmpassword: "",
    department: "",
    hostler: false
  });

  const questions = [
    { id: 1, text: "Your Department", options: ["CSE", "ECE", "EEE", "CIVIL", "MECH"] },
    { id: 2, text: "Are you a hostler?", options: ["YES", "NO"] }
  ];

  const handleRegister = (e) => {
    e.preventDefault();
    if (!formData.fullname || !formData.email || !formData.regno || !formData.password || !formData.confirmpassword) {
      alert("Please fill in all fields");
      return;
    }
    setShowQuestions(true);
  };

  const handleNext = (answer) => {
    if (step === 1) {
      setFormData({ ...formData, department: answer });
    } else if (step === 2) {
      setFormData({ ...formData, hostler: answer === "YES" });
    }

    if (step < questions.length) {
      setStep(step + 1);
    } else {
      setShowSubmit(true);
    }
  };

  const handleSubmit = async () => {
    try {
      console.log(formData);
      const response = await axios.post("http://localhost:3000/register", formData);
      if(response.data.message === "Student registered successfully")
      {
        alert("registration successfully");
      }
      else 
      {
        alert("problem in registration contact owner")
      }
      console.log("Response:", response);
      handleClose();
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-xl w-96 p-6">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">{showQuestions ? "Mental Health Assessment" : "User Registration"}</h2>
          <button onClick={handleClose} className="text-gray-500 hover:text-gray-800">✖</button>
        </div>

        {!showQuestions ? (
          <form onSubmit={handleRegister} className="mt-4 flex flex-col gap-3">
            <label htmlFor="fullname" className="block text-left mt-2.5 text-red-700">Full Name</label>
            <input id="fullname" type="text" placeholder="Full Name" className="border p-2 rounded-md" value={formData.fullname} 
              onChange={(e) => setFormData({ ...formData, fullname: e.target.value })} />

            <label htmlFor="email" className="block text-left mt-2.5 text-red-700">Email</label>
            <input id="email" type="email" placeholder="Email" className="border p-2 rounded-md" value={formData.email} 
              onChange={(e) => setFormData({ ...formData, email: e.target.value })} />

            <label htmlFor="regno" className="block text-left mt-2.5 text-red-700">Regno</label>
            <input id="regno" type="text" placeholder="Reg no" className="border p-2 rounded-md" value={formData.regno} 
              onChange={(e) => setFormData({ ...formData, regno: e.target.value })} />

            <label htmlFor="password" className="block text-left mt-2.5 text-red-700">Password</label>
            <input id="password" type="password" placeholder="Password" className="border p-2 rounded-md" value={formData.password} 
              onChange={(e) => setFormData({ ...formData, password: e.target.value })} />

            <label htmlFor="confirmpassword" className="block text-left mt-2.5 text-red-700">Confirm Password</label>
            <input id="confirmpassword" type="password" placeholder="Confirm Password" className="border p-2 rounded-md" value={formData.confirmpassword} 
              onChange={(e) => setFormData({ ...formData, confirmpassword: e.target.value })} />

            <button type="submit" className="bg-red-700 text-white px-4 py-2 rounded-md">Register & Start Assessment</button>
          </form>
        ) : (
          <>
            <h4 className="text-xl font-bold mt-2">{questions[step - 1].text}</h4>
            <div className="flex flex-col gap-2 mt-4">
              {questions[step - 1].options.map((option, index) => (
                <button key={index} className="bg-red-700 text-white px-4 py-2 rounded-md w-full"
                  onClick={() => handleNext(option)}>
                  {option}
                </button>
              ))}
            </div>

            {showSubmit && (
              <button className="bg-white border border-red-500 text-black px-4 py-2 rounded-md mt-4 w-full" onClick={handleSubmit}>
                Submit
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MentalHealthAssessment;
