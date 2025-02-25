import { useState } from "react";
import axios from "axios";

function Login() {
  const [password, setPassword] = useState("");
  const [registernumber, setRegisterNumber] = useState("");

  const postfunc = async (postobj) => {
    let result = await axios.post("http://localhost:5000/general/register", postobj);
    console.log(result);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert("Login Successful!");
    // Further logic can be added here
  };

  return (
    <div>
    <div className="flex justify-center items-center min-h-screen bg-red-700 font-poppins">
      <div className="mt-10 bg-white p-8 rounded-xl shadow-lg w-[470px] text-center">
        <h2 className="text-black mb-5 text-2xl font-semibold">Login</h2>
        <form onSubmit={handleSubmit}>
          <label
            htmlFor="registernumber"
            className="block text-left mt-2.5 text-red-700"
          >
            Reg No :
          </label>
          <input
            value={registernumber}
            type="text"
            id="registernumber"
            name="registernumber"
            placeholder="Enter your register number"
            onChange={(event) => setRegisterNumber(event.target.value)}
            required
            className="w-full p-2.5 my-2 rounded-md bg-[#eaeaea] outline-none"
          />

          <label htmlFor="password" className="block text-left mt-2.5 text-red-700">
            Password
          </label>
          <input
            value={password}
            type="password"
            id="password"
            name="password"
            placeholder="Create a password"
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
    </div>
  );
}

export default Login;
