import { useState } from "react";
import axios from "axios";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const getfunc = async (postobj) => {
    try {
      let result = await axios.post("http://localhost:3000/Adminlogin", postobj);
      
      console.log(result.data);
      
      if (result.data.message === "Login successful") {
        alert("Login successful");
        // Redirect logic (if needed)
      } else {
        alert(result.data.message);
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Error logging in. Please check your credentials and try again.");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    getfunc({ email, password });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-red-700 font-poppins">
      <div className="mt-10 bg-white p-8 rounded-xl shadow-lg w-[470px] text-center">
        <h2 className="text-black mb-5 text-2xl font-semibold">Admin Login</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email" className="block text-left mt-2.5 text-red-700">
            Email:
          </label>
          <input
            value={email}
            type="text"
            id="email"
            name="email"
            placeholder="Enter your email"
            onChange={(event) => setEmail(event.target.value)}
            required
            className="w-full p-2.5 my-2 rounded-md bg-[#eaeaea] outline-none"
          />

          <label htmlFor="password" className="block text-left mt-2.5 text-red-700">
            Password:
          </label>
          <input
            value={password}
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            onChange={(event) => setPassword(event.target.value)}
            required
            className="w-full p-2.5 my-2 rounded-md bg-[#eaeaea] outline-none"
          />

          <button
            type="submit"
            className="w-full p-3 bg-red-700 text-white rounded-md cursor-pointer text-lg font-bold mt-4 transition duration-300 hover:bg-[rgba(20,20,20,0.285)]"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
