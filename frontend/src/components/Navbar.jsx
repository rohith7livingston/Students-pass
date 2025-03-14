import { useState, useRef, useEffect } from "react";
import { FaBars, FaTimes, FaSignOutAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom"; // React Router
import axios from "axios";
import { X } from "lucide-react"; 

function Navbar() {
  const [isView, setIsView] = useState(false);
  const [activities, setActivities] = useState([]);
  const [regno, setRegno] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const navRef = useRef();
  const navigate = useNavigate(); // React Router navigation

  useEffect(() => {
    // Fetch user registration number from local storage
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser?.regno) {
      setRegno(storedUser.regno);
    }
  }, []);

  useEffect(() => {
    const fetchRecentActivity = async () => {
      if (!regno)
      { return;
      }
      else 
      {
        
      try {
        alert(`the register number i got is ${regno}`)
        const response = await axios.get(
          `http://localhost:3000/getstudentinfo/${regno}`
        );
        console.log("API Response of logged student:", response.data);
        setActivities(response.data);
      } catch (error) {
        console.error("Error fetching recent activity:", error);
      }
      } // Prevent API call if regno is empty

    };

    fetchRecentActivity();
  }, [regno]);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    setLoggingOut(true);
    setTimeout(() => {
      navigate("/"); // Redirect to /login after animation
    }, 2000);
  };

  // Close navbar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full flex justify-between items-center h-20 px-8 bg-red-700 text-white z-50">
      {/* Logo */}
      <img src="sasi.png" alt="Logo" className="h-16 w-auto" />

      {/* Desktop Navigation */}
      <nav className="hidden md:flex gap-6 items-center">
        
        <Link  onClick={() => setIsView(true)}>Profile</Link>

        

        
              
           



        {/* Logout Button (Desktop) - Transparent */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-white hover:text-gray-300 transition duration-300"
        >
          <FaSignOutAlt className="text-xl" />
          Logout
        </button>
      </nav>
      {isView && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                  <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md relative">
                    {/* Close Button (X) on top right */}
                    <button
                      className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 transition duration-200"
                      onClick={() => setIsView(false)}
                    >
                      <X size={24} />
                    </button>
        
                    <h2 className="text-2xl font-bold mb-4 text-center text-white-800">
                      Profile Details
                    </h2>
                    <div className="border-t border-gray-300 my-4"></div>
        
                    <div className="space-y-3">
                      <ProfileDetail label="Name" value={activities.fullname} />
                      <ProfileDetail label="Reg No" value={activities.regno} />
                      <ProfileDetail label="Email" value={activities.email} />
                      <ProfileDetail label="Department" value={activities.department} />
                    </div>
                  </div>
                </div>
              )}

      {/* Mobile Navigation Button */}
      <button className="md:hidden text-2xl" onClick={toggleNavbar}>
        <FaBars />
      </button>

      {/* Mobile Navigation Menu */}
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 w-full h-screen bg-red-700 flex flex-col items-center justify-center transition-transform duration-500 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } z-40`}
      >
        {/* 🔥 Close Button (INSIDE Menu) */}
        <button className="absolute top-6 right-6 text-2xl" onClick={toggleNavbar}>
          <FaTimes />
        </button>

        {/* Mobile Menu Links */}
        <Link to="/">Home</Link>
        <Link  onClick={() => setIsView(true)}>Profile</Link>

        {/* Logout Button (Mobile) - Transparent */}
        <button
          onClick={handleLogout}
          className="mt-6 flex items-center gap-2 text-white hover:text-gray-300 transition duration-300"
        >
          <FaSignOutAlt className="text-xl" />
          Logout
        </button>
      </nav>

      {/* Logging Out Animation */}
      {loggingOut && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="text-white text-2xl animate-pulse">Logging Out...</div>
        </div>
      )}
    </header>
  );
}


const ProfileDetail = ({ label, value }) => {
  return (
    <div className="flex justify-between items-center bg-gray-100 p-3 rounded-lg">
      <span className="font-medium text-gray-700">{label}:</span>
      <span className="text-gray-900 font-semibold">{value || "N/A"}</span>
    </div>
  );
};


export default Navbar;
