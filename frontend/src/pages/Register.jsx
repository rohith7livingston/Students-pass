// import { useState } from "react";
// import axios from "axios";
// import { Link, useNavigate } from "react-router-dom"; // Import useNavigate

// function Registration() {
//   const [fullname, setFullname] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmpassword, setConfirmpassword] = useState("");
//   const [regno, setRegno] = useState("");

//   const navigate = useNavigate(); // Initialize navigate

//   let postfunc = async (postobj) => {
//     try {
//       let result = await axios.post("http://localhost:3000/register", postobj);
//       console.log(result);
//       return result;
//     } catch (error) {
//       console.error("Registration failed:", error);
//       alert("Registration failed. Please try again.");
//     }
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     let postobj = { fullname, email, regno, password, confirmpassword };

//     if (password !== confirmpassword) {
//       alert("Password and Confirm password must be the same!");
//       return;
//     }

//     const result = await postfunc(postobj);

//     if (result) {
//       alert("Registration Successful!");
//       // Navigate to login page after successful registration
//       navigate('/login');
//     }
//   };

//   return (
//     <div>
//       <div className="flex justify-center items-center min-h-screen bg-red-700 font-poppins ">
//         <div className="mt-10 bg-white p-8 rounded-xl shadow-lg w-[470px] text-center">
//           <h2 className="text-black mb-5 text-2xl font-semibold">Sign Up</h2>
//           <form onSubmit={handleSubmit}>
//             <label htmlFor="name" className="block text-left mt-2.5 text-red-700">
//               Full Name
//             </label>
//             <input
//               value={fullname}
//               type="text"
//               id="name"
//               name="name"
//               placeholder="Enter your full name"
//               onChange={(event) => setFullname(event.target.value)}
//               required
//               className="w-full p-2.5 my-2 rounded-md bg-[#eaeaea] outline-none"
//             />

//             <label htmlFor="email" className="block text-left mt-2.5 text-red-700">
//               Email
//             </label>
//             <input
//               value={email}
//               type="email"
//               id="email"
//               name="email"
//               placeholder="Enter your email"
//               onChange={(event) => setEmail(event.target.value)}
//               required
//               className="w-full p-2.5 my-2 rounded-md bg-[#eaeaea] outline-none"
//             />

//             <label htmlFor="regno" className="block text-left mt-2.5 text-red-700">
//               Reg No :
//             </label>
//             <input
//               value={regno}
//               type="text"
//               id="regno"
//               name="regno"
//               placeholder="Enter your register number"
//               onChange={(event) => setRegno(event.target.value)}
//               required
//               className="w-full p-2.5 my-2 rounded-md bg-[#eaeaea] outline-none"
//             />

//             <label htmlFor="password" className="block text-left mt-2.5 text-red-700">
//               Password
//             </label>
//             <input
//               value={password}
//               type="password"
//               id="password"
//               name="password"
//               placeholder="Create a password"
//               onChange={(event) => setPassword(event.target.value)}
//               required
//               className="w-full p-2.5 my-2 rounded-md bg-[#eaeaea] outline-none"
//             />

//             <label htmlFor="confirm_password" className="block text-left mt-2.5 text-red-700">
//               Confirm password
//             </label>
//             <input
//               value={confirmpassword}
//               type="password"
//               id="confirm_password"
//               name="confirm_password"
//               placeholder="Confirm your password"
//               onChange={(event) => setConfirmpassword(event.target.value)}
//               required
//               className="w-full p-2.5 my-2 rounded-md bg-[#eaeaea] outline-none"
//             />

//             <button
//               type="submit"
//               className="w-full p-3 bg-red-700 text-white rounded-md cursor-pointer text-lg font-bold mt-4 transition duration-300 hover:bg-[rgba(20,20,20,0.285)]"
//             >
//               Register
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Registration;
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Registration() {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    regno: "",
    password: "",
    confirmpassword: "",
  });

  const [error, setError] = useState(""); // Handle errors
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (formData.password !== formData.confirmpassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/register`, formData);
      
      if (response.status === 201) {
        alert("Registration Successful!");
        navigate("/login");
      } else {
        setError(response.data.message || "Registration failed");
      }
    } catch (error) {
      setError("Server error. Please try again.");
      console.error("Registration error:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-red-700 font-poppins">
      <div className="mt-10 bg-white p-8 rounded-xl shadow-lg w-[500px] text-center">
        <h2 className="text-black mb-5 text-2xl font-semibold">Sign Up</h2>

        {error && <p className="text-red-500">{error}</p>} {/* Display errors */}

        <form onSubmit={handleSubmit}>
          {["fullname", "email", "regno", "password", "confirmpassword"].map((field) => (
            <div key={field} className="mb-4">
              <label className="block text-left text-red-700 capitalize">{field.replace("confirm", "Confirm ")}</label>
              <input
                type={field.includes("password") ? "password" : "text"}
                name={field}
                placeholder={`Enter your ${field}`}
                value={formData[field]}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
          ))}

          <button type="submit" className="bg-red-700 text-white px-6 py-2 rounded-lg w-full mt-4">
            Register
          </button>
        </form>

        <p className="mt-3 text-gray-600">
          Already have an account? <Link to="/login" className="text-red-700 font-semibold">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Registration;
