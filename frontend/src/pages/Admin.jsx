import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import StudentRequestActivity from "../components/StudentRequestActivity";
import axios from "axios";
import { FaCheckCircle, FaClock, FaTimesCircle } from "react-icons/fa";

const COLORS = ["#4CAF50", "#FFC107", "#F44336"];

const Admin = () => {
  const [user, setUser] = useState({ name: "Admin", role: "Guest" });
  const [data, setData] = useState([]);
  const [approved, setApproved] = useState(0);
  const [pending, setPending] = useState(0);
  const [rejected, setRejected] = useState(0);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser.email && parsedUser.role) {
          setUser({ name: parsedUser.email, role: parsedUser.role });
          fetchData(parsedUser.role);
        }
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  const fetchData = async (adminRole) => {
    try {
      const response = await axios.get(`http://localhost:3000/getLetters?role=${adminRole}`);
      
      if (response.data) {
        const { leaveTypeCounts, approved, rejected, pending } = response.data;

        // Format pie chart data
        const formattedData = Object.keys(leaveTypeCounts).map((key) => ({
          name: key,
          value: leaveTypeCounts[key],
        }));

        setData(formattedData);
        setApproved(approved);
        setRejected(rejected);
        setPending(pending);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />

      <div className="flex flex-col md:flex-row p-6 gap-6">
        {/* Sidebar */}
        <div className="w-full md:w-1/3 bg-white p-6 shadow-lg rounded-lg mt-20">
          <h1 className="text-xl font-bold text-gray-700 mb-4">Leave Statistics</h1>
          <PieChart width={300} height={300} className="mx-auto">
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              label
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>

        {/* Main Content */}
        <div className="w-full md:w-2/3 space-y-6">
          {/* Welcome Section */}
          <div className="bg-white p-6 rounded-lg shadow-lg flex justify-between items-center mt-20">
            <h2 className="text-2xl font-bold text-gray-800">
              Welcome, <span className="text-red-500">{user.name}</span> ({user.role})
            </h2>
          </div>

          {/* Leave Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-green-100 p-6 rounded-lg flex items-center gap-4">
              <FaCheckCircle className="text-green-600 text-4xl" />
              <div>
                <p className="text-lg font-bold">Approved</p>
                <p className="text-2xl">{approved}</p>
              </div>
            </div>

            <div className="bg-yellow-100 p-6 rounded-lg flex items-center gap-4">
              <FaClock className="text-yellow-600 text-4xl" />
              <div>
                <p className="text-lg font-bold">Pending</p>
                <p className="text-2xl">{pending}</p>
              </div>
            </div>

            <div className="bg-red-100 p-6 rounded-lg flex items-center gap-4">
              <FaTimesCircle className="text-red-600 text-4xl" />
              <div>
                <p className="text-lg font-bold">Rejected</p>
                <p className="text-2xl">{rejected}</p>
              </div>
            </div>
          </div>

          {/* Student Requests */}
          <StudentRequestActivity />
        </div>
      </div>
    </div>
  );
};

export default Admin;
