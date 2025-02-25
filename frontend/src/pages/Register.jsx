import { useState } from "react";
import axios from "axios";

function Registration() {
  const [FullName, setFullName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [registernumber, setregisternumber] = useState("");

  let postfunc = async (postobj) => {
    let result = await axios.post("http://localhost:5000/general/register", postobj);
    console.log(result);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (Password !== ConfirmPassword) {
      alert("Password and Confirm Password must be the same!");
      return;
    }

    alert("Registration Successful!");
    // Here, you can proceed with further logic like sending data to a backend.
  };

  return (
    <div>
        <div className="flex justify-center items-center min-h-screen bg-red-700 font-poppins ">
      <div className="mt-10 bg-white p-8 rounded-xl shadow-lg w-[470px] text-center">
        <h2 className="text-black mb-5 text-2xl font-semibold">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name" className="block text-left mt-2.5 text-red-700">
            Full Name
          </label>
          <input
            value={FullName}
            type="text"
            id="name"
            name="name"
            placeholder="Enter your full name"
            onChange={(event) => setFullName(event.target.value)}
            required
            className="w-full p-2.5 my-2 rounded-md bg-[#eaeaea] outline-none"
          />

          <label htmlFor="email" className="block text-left mt-2.5 text-red-700">
            Email
          </label>
          <input
            value={Email}
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            onChange={(event) => setEmail(event.target.value)}
            required
            className="w-full p-2.5 my-2 rounded-md bg-[#eaeaea] outline-none"
          />

          <label htmlFor="registernumber" className="block text-left mt-2.5 text-red-700">
            Reg No :
          </label>
          <input
            value={registernumber}
            type="text"
            id="registernumber"
            name="registernumber"
            placeholder="Enter your register number"
            onChange={(event) => setregisternumber(event.target.value)}
            required
            className="w-full p-2.5 my-2 rounded-md bg-[#eaeaea] outline-none"
          />

         

          <label htmlFor="password" className="block text-left mt-2.5 text-red-700">
            Password
          </label>
          <input
            value={Password}
            type="password"
            id="password"
            name="password"
            placeholder="Create a password"
            onChange={(event) => setPassword(event.target.value)}
            required
            className="w-full p-2.5 my-2 rounded-md bg-[#eaeaea] outline-none"
          />

          <label htmlFor="confirm_password" className="block text-left mt-2.5 text-red-700">
            Confirm Password
          </label>
          <input
            value={ConfirmPassword}
            type="password"
            id="confirm_password"
            name="confirm_password"
            placeholder="Confirm your password"
            onChange={(event) => setConfirmPassword(event.target.value)}
            required
            className="w-full p-2.5 my-2 rounded-md bg-[#eaeaea] outline-none"
          />

          <button
            type="submit"
            className="w-full p-3 bg-red-700 text-white rounded-md cursor-pointer text-lg font-bold mt-4 transition duration-300 hover:bg-[rgba(20,20,20,0.285)]"
          >
            Register
          </button>
        </form>
      </div>
    </div>
    </div>
  );
}

export default Registration;
