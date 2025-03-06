import { useState } from "react";
import axios from "axios";

function Registration() {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
 
  const [regno, setRegno] = useState("");

  let postfunc = async (postobj) => {
    let result = await axios.post("http://localhost:3000/register", postobj);
    console.log(result);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let postobj={fullname,email,regno,password,confirmpassword}
    
    if (password !== confirmpassword) {
      alert("password and Confirm password must be the same!");
      return;
    }
    else{
      postfunc(postobj);
      alert("Registration Successful!");
    }

    
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
            value={fullname}
            type="text"
            id="name"
            name="name"
            placeholder="Enter your full name"
            onChange={(event) => setFullname(event.target.value)}
            required
            className="w-full p-2.5 my-2 rounded-md bg-[#eaeaea] outline-none"
          />

          <label htmlFor="email" className="block text-left mt-2.5 text-red-700">
            Email
          </label>
          <input
            value={email}
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            onChange={(event) => setEmail(event.target.value)}
            required
            className="w-full p-2.5 my-2 rounded-md bg-[#eaeaea] outline-none"
          />

          <label htmlFor="regno" className="block text-left mt-2.5 text-red-700">
            Reg No :
          </label>
          <input
            value={regno}
            type="text"
            id="regno"
            name="regno"
            placeholder="Enter your register number"
            onChange={(event) => setRegno(event.target.value)}
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

          <label htmlFor="confirm_password" className="block text-left mt-2.5 text-red-700">
            Confirm password
          </label>
          <input
            value={confirmpassword}
            type="password"
            id="confirm_password"
            name="confirm_password"
            placeholder="Confirm your password"
            onChange={(event) => setConfirmpassword(event.target.value)}
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
