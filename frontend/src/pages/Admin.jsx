import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import StudentRequestActivity from "../components/StudentRequestActivity";
import axios from "axios";

const COLORS = ["#87CEEB", "#FFBB28", "#4682B4", "#191970", "#6A5ACD"];

const Admin = () => {
  const [user, setUser] = useState({ name: "John Doe", role: "" }); // Default user state
  const [data, setData] = useState([]); // State to store fetched leave data

  // Function to fetch data from backend
  const fetchData = async (adminRole) => {
    try {
      const response = await axios.get(`http://localhost:3000/getLetters?role=${adminRole}`);
      
      console.log("Fetched data:", response.data.leaveTypeCounts);

      // Safe check to avoid undefined values
      const leaveTypeCounts = response.data?.leaveTypeCounts || {};

      // Convert response object to array format for PieChart
      const formattedData = Object.keys(leaveTypeCounts).map((key) => ({
        name: key,
        value: leaveTypeCounts[key],
      }));

      setData(formattedData);
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Server error");
    }
  };

  // Fetch user role from local storage and fetch data
  useEffect(() => {
    const storedUser = localStorage.getItem("user"); // Fetch from local storage
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser); // Parse JSON data
      if (parsedUser.role) {
        setUser({ name: parsedUser.name, role: parsedUser.role }); // Update state with role
        fetchData(parsedUser.role); // Fetch data using role
      } else {
        alert("User role not found. Please log in.");
      }
    } else {
      alert("You need to log in.");
    }
  }, []);

  // Dynamically calculate leave counts
  const approved = data.find((item) => item.name === "Approved")?.value || 0;
  const pending = data.find((item) => item.name === "Pending")?.value || 0;
  const rejected = data.find((item) => item.name === "Rejected")?.value || 0;

  return (
    <div className="bg-red-100 min-h-screen">
      <Navbar />

      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <div className="w-full md:w-1/3 p-6 shadow-md">
          <div className="text-center mb-4">
            <h1 className="text-xl font-bold text-red-600">SASI AUTONOMOUS</h1>
          </div>
          <PieChart width={300} height={300}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              label
              isAnimationActive={true} // Enable animation
              animationDuration={1500} // Smooth animation over 1.5 seconds
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
          <div className="mt-4 text-lg">
            <p className="font-bold">
              Approved: <span className="text-green-500">{approved}</span>
            </p>
            <p className="font-bold">
              Pending: <span className="text-yellow-500">{pending}</span>
            </p>
            <p className="font-bold">
              Rejected: <span className="text-red-500">{rejected}</span>
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="w-full md:w-2/3 p-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">
              Welcome <span className="text-red-500">{user.name}</span>
            </h2>
            <div className="flex gap-4">
              <button className="bg-white p-2 rounded-full shadow">✉️</button>
              <button className="bg-white p-2 rounded-full shadow">👤</button>
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