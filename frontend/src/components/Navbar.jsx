import { useState, useRef, useEffect } from "react";
import { FaBars, FaTimes, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // React Router

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const navRef = useRef();
  const navigate = useNavigate(); // React Router navigation

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    setLoggingOut(true);
    setTimeout(() => {
      navigate("/login"); // Redirect to /login after animation
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
        {["Home", "Notices", "About Me"].map((item) => (
          <a
            key={item}
            href="/#"
            className="relative after:block after:h-0.5 after:w-full after:bg-white after:scale-0 hover:after:scale-100 after:transition-transform after:duration-700"
          >
            {item}
          </a>
        ))}

        {/* Logout Button (Desktop) - Transparent */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-white hover:text-gray-300 transition duration-300"
        >
          <FaSignOutAlt className="text-xl" />
          Logout
        </button>
      </nav>

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
        {["Home", "Notices", "Profile"].map((item) => (
          <a key={item} href="/#" className="text-xl py-3" onClick={toggleNavbar}>
            {item}
          </a>
        ))}

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

export default Navbar;
