import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [role, setRole] = useState("student");
  const [regnoOrEmail, setRegnoOrEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();







  const getfunc = async () => {
    try {
      let result;
      if (role === "student") {
        result = await axios.get("http://localhost:3000/login", {
          params: { regno: regnoOrEmail, password },
        });
      } else {
        result = await axios.post("http://localhost:3000/Adminlogin", {
          email: regnoOrEmail,
          password,
        });
      }
  
      console.log(result.data);
  
      if (
        result.data.status === "loginsuccess" ||
        result.data.message === "Login successful"
      ) {
        toast.success("🎉 Login successful!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
  
        // Store user details correctly
        if (role === "admin") {
          localStorage.setItem(
            "user",
            JSON.stringify({
              email: regnoOrEmail,
              role: result.data.admin?.role || "admin",
            })
          );
        } else {
          localStorage.setItem(
            "user",
            JSON.stringify({
              regno: regnoOrEmail, // Store the correct regno
              email: result.data.email, // Store the correct email
              role: "student",
            })
          );
        }
  
        setTimeout(() => {
          navigate(role === "student" ? "/student" : "/admin");
        }, 3000);
      } else {
        toast.error(result.data.message || "❌ Invalid credentials!", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("⚠️ Error logging in. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };
  









  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent form submission from reloading the page
    getfunc();
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-red-600 to-red-800 font-poppins">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-[450px] text-center overflow-hidden">
        <ToastContainer /> {/* Toast Container for notifications */}
        <h2 className="text-gray-900 mb-6 text-3xl font-semibold">Login</h2>

        {/* Role Selection Tabs */}
        <div className="flex bg-gray-200 p-1 rounded-xl mb-5 relative">
          <motion.div
            className="absolute top-1 bottom-1 left-1 w-1/2 bg-red-600 rounded-lg shadow-md"
            initial={{ x: role === "student" ? 0 : "100%" }}
            animate={{ x: role === "student" ? 0 : "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          />
          <button
            onClick={() => setRole("student")}
            className={`w-1/2 py-2 text-lg font-semibold relative z-10 transition duration-300 ${
              role === "student" ? "text-white" : "text-gray-700"
            }`}
          >
            Student
          </button>
          <button
            onClick={() => setRole("admin")}
            className={`w-1/2 py-2 text-lg font-semibold relative z-10 transition duration-300 ${
              role === "admin" ? "text-white" : "text-gray-700"
            }`}
          >
            Admin
          </button>
        </div>

        {/* Animated Form Switching */}
        <AnimatePresence mode="wait">
          <motion.form
            key={role}
            onSubmit={handleSubmit}
            initial={{ x: role === "student" ? 100 : -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: role === "student" ? -100 : 100, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="text-left"
          >
            <label
              htmlFor="regnoOrEmail"
              className="block text-gray-700 text-sm font-semibold"
            >
              {role === "student" ? "Reg No" : "Email"}:
            </label>
            <input
              value={regnoOrEmail}
              type={role === "student" ? "text" : "email"}
              id="regnoOrEmail"
              placeholder={`Enter your ${
                role === "student" ? "register number" : "email"
              }`}
              onChange={(event) => setRegnoOrEmail(event.target.value)}
              required
              className="w-full p-3 mt-1 mb-4 rounded-lg bg-gray-100 border-2 border-gray-300 text-gray-900 focus:border-red-500 focus:outline-none transition"
            />

            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-semibold"
            >
              Password:
            </label>
            <input
              value={password}
              type="password"
              id="password"
              placeholder="Enter your password"
              onChange={(event) => setPassword(event.target.value)}
              required
              className="w-full p-3 mt-1 mb-4 rounded-lg bg-gray-100 border-2 border-gray-300 text-gray-900 focus:border-red-500 focus:outline-none transition"
            />

            <button
              type="submit"
              className="w-full p-3 mt-4 bg-red-600 text-white rounded-lg text-lg font-bold shadow-md transition duration-300 hover:bg-red-700 hover:text-gray-200"
            >
              Login
            </button>
          </motion.form>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default Login;
