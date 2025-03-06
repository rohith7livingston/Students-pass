import { useRef, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import Sasi_Img from "./../Assets/sasilogo.png";

function Navbar() {
  const navRef = useRef();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [username, setUsername] = useState("Piyush Agarwal Biz");

  const showNavbar = () => {
    navRef.current.classList.toggle("translate-y-full");
  };

  return (
    <>
      <header className="flex justify-between items-center h-20 px-8 bg-red-700 text-white">
        <h3 className="text-xl font-bold">
          <img src={Sasi_Img} alt="Logo" />
        </h3>
        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6">
          <a href="/#" className="relative after:block after:h-0.5 after:w-full after:bg-white after:scale-0 hover:after:scale-100 after:transition-transform after:duration-700">
            Home
          </a>
          <a href="/#" className="relative after:block after:h-0.5 after:w-full after:bg-white after:scale-0 hover:after:scale-100 after:transition-transform after:duration-700">
            Father
          </a>
          <a href="/#" className="relative after:block after:h-0.5 after:w-full after:bg-white after:scale-0 hover:after:scale-100 after:transition-transform after:duration-700">
            Son
          </a>
          <a href="#" className="relative after:block after:h-0.5 after:w-full after:bg-white after:scale-0 hover:after:scale-100 after:transition-transform after:duration-700" onClick={() => setIsProfileOpen(true)}>
            About Me
          </a>
        </nav>
        {/* Mobile Navigation Button */}
        <button className="md:hidden text-2xl" onClick={showNavbar}>
          <FaBars />
        </button>
        {/* Mobile Navigation */}
        <nav
          ref={navRef}
          className="absolute top-0 left-0 w-full h-screen flex flex-col items-center justify-center bg-red-700 transition-transform duration-1000 -translate-y-full md:hidden"
        >
          <button className="absolute top-6 right-6 text-2xl" onClick={showNavbar}>
            <FaTimes />
          </button>
          <a href="/#" className="text-xl py-2" onClick={showNavbar}>
            Home
          </a>
          <a href="/#" className="text-xl py-2" onClick={showNavbar}>
            Father
          </a>
          <a href="/#" className="text-xl py-2" onClick={showNavbar}>
            Son
          </a>
          <a href="#" className="text-xl py-2" onClick={() => setIsProfileOpen(true)}>
            About Me
          </a>
        </nav>
      </header>
      {/* Profile Modal */}
      {isProfileOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
            <h2 className="text-xl font-bold mb-4">Profile Details</h2>
            <div className="mb-4">
              <label className="block text-gray-700">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <button
              onClick={() => setIsProfileOpen(false)}
              className="bg-red-500 text-white px-4 py-2 rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;