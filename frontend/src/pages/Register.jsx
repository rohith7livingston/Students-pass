import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = ({ show, handleClose }) => {
  const [showQuestions, setShowQuestions] = useState(false);
  const [step, setStep] = useState(1);
  const [showSubmit, setShowSubmit] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    regno: "",
    password: "",
    confirmpassword: "",
    department: "",
    hostler: false,
  });

  const questions = [
    {
      id: 1,
      text: "Your Department",
      options: ["CSE", "ECE", "EEE", "CIVIL", "MECH"],
    },
    { id: 2, text: "Are you a hostler?", options: ["YES", "NO"] },
  ];

  // Common Input Fields
  const inputFields = [
    { id: "fullname", type: "text", label: "Full Name" },
    { id: "email", type: "email", label: "Email" },
    { id: "regno", type: "text", label: "Reg No" },
    { id: "password", type: "password", label: "Password" },
    { id: "confirmpassword", type: "password", label: "Confirm Password" },
  ];

  // Registration Handler
  const handleRegister = (e) => {
    e.preventDefault();

    // Validation
    if (
      !formData.fullname.trim() ||
      !formData.email.trim() ||
      !formData.regno.trim()
    ) {
      toast.error("Fields cannot be empty!");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Invalid email format");
      return;
    }

    if (formData.password !== formData.confirmpassword) {
      toast.error("Passwords do not match!");
      return;
    }

    setShowQuestions(true);
  };

  // Handle Next Step in Assessment
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

  // Form Submission
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3000/register",
        formData
      );
      if (response.status === 201) {
        toast.success("Registration successful!");
        setTimeout(() => {
          handleClose();
        }, 2500);
      } else {
        toast.error("Problem in registration. Contact support.");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-20 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-xl w-96 p-7">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">
            {showQuestions ? "tell us about you " : "User Registration"}
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-800"
          >
            ✖
          </button>
        </div>

        {/* User Registration Form */}
        {!showQuestions ? (
          <form onSubmit={handleRegister} className="mt-4 flex flex-col gap-3">
            {inputFields.map(({ id, type, label }) => (
              <div key={id}>
                <label
                  htmlFor={id}
                  className="block text-left mt-2.5 text-red-700"
                >
                  {label}
                </label>
                <input
                  id={id}
                  type={type}
                  placeholder={label}
                  className="border p-2 rounded-md w-full"
                  value={formData[id]}
                  onChange={(e) =>
                    setFormData({ ...formData, [id]: e.target.value })
                  }
                />
              </div>
            ))}

            <button
              type="submit"
              className="bg-red-700 text-white px-4 py-2 rounded-md"
            >
              Register
            </button>
          </form>
        ) : (
          <>
            {/* Mental Health Questions */}
            <h4 className="text-xl font-bold mt-2">
              {questions[step - 1].text}
            </h4>
            <div className="flex flex-col gap-2 mt-4">
              {questions[step - 1].options.map((option, index) => (
                <button
                  key={index}
                  className="bg-red-700 text-white px-4 py-2 rounded-md w-full"
                  onClick={() => handleNext(option)}
                >
                  {option}
                </button>
              ))}
            </div>

            {showSubmit && (
              <button
                className={`bg-red-700 text-white px-4 py-2 rounded-md mt-4 w-full ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            )}
          </>
        )}

        <ToastContainer position="top-right" autoClose={2500} />
      </div>
    </div>
  );
};

export default Register;
