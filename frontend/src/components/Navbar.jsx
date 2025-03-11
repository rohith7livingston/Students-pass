import { useState, useRef, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef();

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
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
      <nav className="hidden md:flex gap-6">
        {["Home", "Notifications", "About Me"].map((item) => (
          <a
            key={item}
            href="/#"
            className="relative after:block after:h-0.5 after:w-full after:bg-white after:scale-0 hover:after:scale-100 after:transition-transform after:duration-700"
          >
            {item}
          </a>
        ))}
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
        {["Home", "notifications", "Profile"].map((item) => (
          <a key={item} href="/#" className="text-xl py-3" onClick={toggleNavbar}>
            {item}
          </a>
        ))}
      </nav>
    </header>
  );
}

export default Navbar;
