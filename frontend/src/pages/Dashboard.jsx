import MentalHealthAssessment from "./Register";
import { useState } from "react";

const Dashboard = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="flex justify-center items-center h-screen">
      <button
        className="bg-blue-600 text-white px-5 py-2 rounded-md"
        onClick={() => setShowModal(true)}
      >
        Start Assessment
      </button>

      <MentalHealthAssessment show={showModal} handleClose={() => setShowModal(false)} />
    </div>
  );
};

export default Dashboard;
