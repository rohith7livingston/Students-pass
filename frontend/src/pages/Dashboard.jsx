import React, { useState } from "react";
import "./../stylesheet/Dashboard.css"; // Add CSS file for styling
import Registration from "./Register";// Import Registration Form component

const Dashboard = () => {
  const [isRegisterOpen, setRegisterOpen] = useState(false);

  const openRegister = () => {
    setRegisterOpen(true);
  };

  const closeRegister = () => {
    setRegisterOpen(false);
  };

  return (
    <div className={`dashboard ${isRegisterOpen ? "blur" : ""}`}>
      <h1>Welcome to Dashboard</h1>
      <button onClick={openRegister} className="register-btn">
        Register
      </button>

      {isRegisterOpen && <Registration onClose={closeRegister} />}
    </div>
  );
};

export default Dashboard;
