import React, { useState, useEffect } from "react";
import MentalHealthAssessment from "./Register";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa"; // Importing icons for hamburger menu

const words = ["Connect", "Grow", "Build"];

const Dashboard = () => {
  const [index, setIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-red-50 min-h-screen">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-4 bg-red-700 shadow-md relative">
        <img src="sasi.png" alt="Logo" className="h-14 w-auto" />

        {/* Hamburger Icon for Mobile */}
        <div className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <FaTimes className="text-white h-6 w-6" /> : <FaBars className="text-white h-6 w-6" />}
        </div>

        {/* Navigation Links */}
        <ul
          className={`absolute md:static top-16 left-0 w-full md:w-auto bg-red-700 md:flex md:space-x-6 transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'block' : 'hidden md:flex'}`}
        >
          <li className="text-white px-4 py-2 md:px-0 cursor-pointer">Home</li>
          <li className="text-white px-4 py-2 md:px-0 cursor-pointer">About</li>
          <li className="text-white px-4 py-2 md:px-0 cursor-pointer">Features</li>
          <Link to="/login" className="text-white px-4 py-2 md:px-0 cursor-pointer">Login</Link>
          <li className="text-white px-4 py-2 md:px-0 cursor-pointer" onClick={() => setShowModal(true)}>Register</li>
        </ul>
      </nav>
      <MentalHealthAssessment show={showModal} handleClose={() => setShowModal(false)} />

      {/* Main Content */}
      <div className="flex flex-col items-center text-center px-4 md:px-16 py-16">
        <h1 className="text-5xl font-light leading-tight">WELCOME</h1>
        {/* Render the words only if modal and menu are closed */}
{!showModal && !isMobileMenuOpen && (
  <p className="text-5xl mt-2 font-semibold">
    Let us
    <span className="inline-block w-[190px] text-center relative overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          className="font-bold text-red-500 inline-block"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
    together
  </p>
)}

        <h2 className="text-3xl text-red-500 font-bold mt-8">Values we live</h2>
      </div>

      {/* Cards Section */}
      <div className="flex flex-col md:flex-row justify-center items-center space-x-0 md:space-x-20 mt-10">
        {["growth.png", "privacy.png", "community.png"].map((img, idx) => (
          <div
            key={idx}
            className="bg-white p-6 rounded-lg shadow-lg w-64 md:w-52 text-center shadow-gray-300 transition-all duration-500 hover:shadow-red-500 mb-6 md:mb-0"
          >
            <img src={img} alt="" className="w-12 h-12 mx-auto" />
            <p className="font-bold text-xl capitalize mt-4">{img.split(".")[0]}</p>
            <p className="text-gray-600 mt-2">This is {img.split(".")[0]} description</p>
          </div>
        ))}
      </div>

      {/* Grid Section with Scroll Animation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-11 mt-16 px-6 md:px-16">
        {["Why This App", "Secure and Private", "Community Driven"].map((title, idx) => (
          <>
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold">{title}</h2>
              <p className="mt-2 text-gray-700">
                {title === "Why This App"
                  ? "This app helps you connect, grow, and maintain privacy while building a strong community."
                  : title === "Secure and Private"
                  ? "We prioritize your privacy with advanced security features."
                  : "Built for a strong and engaging community, ensuring valuable interactions."}
              </p>
            </motion.div>
            <motion.div
              key={idx + 3}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <img src="whyimage.jpeg" alt={title} className="w-full h-96 object-cover rounded-lg shadow-md" />
            </motion.div>
          </>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
