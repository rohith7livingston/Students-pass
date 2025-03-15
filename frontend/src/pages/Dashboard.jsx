import React, { useState, useEffect } from "react";
import MentalHealthAssessment from "./Register";
import { motion,AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const words = ["Connect", "Grow", "Build"];

const Dashboard = () => {
  const [index, setIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 2000); // Change every 2 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-red-50 min-h-screen">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-4 bg-red-700 shadow-md">
        <img src="sasi.png" alt="Logo" className="h-14 w-auto" />

        <ul className="flex space-x-6">
          <li className="text-white cursor-pointer">Home</li>
          <li className="text-white cursor-pointer">About</li>
          <li className="text-white cursor-pointer">Features</li>
          <Link to="/login">
            <li className="text-white cursor-pointer">Login</li>
          </Link>
          <li className="text-white cursor-pointer" onClick={() => setShowModal(true)}>
            Register
          </li>
          <MentalHealthAssessment show={showModal} handleClose={() => setShowModal(false)} />
        </ul>
      </nav>

      {/* Main Content */}
      <div className="flex flex-col items-start px-16 py-16">
        <h1 className="text-5xl font-light leading-tight">WELCOME</h1>
        <p className="text-5xl mt-2 whitespace-nowrap font-semibold">
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
        <h2 className="text-3xl text-red-500 font-bold font-serif mt-8">Values we live</h2>

           {/* Cards Section */}
        <div className="flex space-x-20 mt-28">
          {[
            { img: "growth.png", title: "lets grow", desc: "this is lets grow" },
            { img: "privacy.png", title: "privacy", desc: "this is privacy description" },
            { img: "community.png", title: "community", desc: "this is community description" }
          ].map((card, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-xl w-52 shadow-gray-300 transition-all duration-500 ease-in-out 
  hover:shadow-red-500 hover:shadow-xl hover:animate-shake"
            >
              <div className="flex items-center space-x-3">
                <img src={card.img} alt={card.title} className="w-12 h-12" />
                <p className="font-bold text-xl">{card.title}</p>
              </div>
              <p>{card.desc}</p>
            </div>
          ))}
        </div>

        {/* Grid Section with Scroll Animation */}
        <div className="grid grid-cols-2 gap-11 mt-32">
          {/* Row 1 */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold">WHY This app</h2>
            <p className="mt-2 text-gray-700">
              This app helps you connect, grow, and maintain privacy while
              building a strong community.
            </p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 50 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <img src="whyimage.jpeg" alt="Why this app" className="w-full h-96 object-cover rounded-lg shadow-md" />
          </motion.div>

          {/* Row 2 */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.5 }}
          >
            <img src="whyimage.jpeg" alt="Security" className="w-full h-96 object-cover rounded-lg shadow-md" />
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 50 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold">Secure and Private</h2>
            <p className="mt-2 text-gray-700">
              We prioritize your privacy with advanced security features.
            </p>
          </motion.div>

          {/* Row 3 */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold">Community Driven</h2>
            <p className="mt-2 text-gray-700">
              Built for a strong and engaging community, ensuring valuable interactions.
            </p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 50 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <img src="whyimage.jpeg" alt="Community Driven" className="w-full h-96 object-cover rounded-lg shadow-md" />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
