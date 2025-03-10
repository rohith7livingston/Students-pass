import React, { useState,useEffect } from "react";
import Navbar from "../components/Navbar";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import StudentRequestActivity from "../components/StudentRequestActivity";
import axios from "axios";






const COLORS = ["#87CEEB", "#FFBB28", "#4682B4", "#191970", "#6A5ACD"];

const Admin = () => {
  const [user] = useState({ name: "John Doe" }); // Replace with actual user data
  const [data, setData] = useState([]); // State to store fetched leave data
  const [loading, setLoading] = useState(true); // Loading state

  // Function to fetch data from backend
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/getLeavesData");
      console.log("Fetched Data:", response.data);

      // Convert response object to array format for PieChart
      const formattedData = Object.keys(response.data).map((key) => ({
        name: key,
        value: response.data[key],
      }));

      setData(formattedData);
      setLoading(false);
    } catch (error) {
      console.error("Error in getting the data", error);
      alert(error.response?.data?.message || "Server error");
      setLoading(false);
    }
  };

  // Fetch data when component mounts (on page load)
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="bg-red-100 min-h-screen">
      <Navbar />
      
      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <div className="w-full md:w-1/3 p-6 bg-white shadow-md">
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
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
          <div className="mt-4 text-lg">
            <p className="font-bold">Approved: <span className="text-green-500">29</span></p>
            <p className="font-bold">Pending: <span className="text-yellow-500">12</span></p>
            <p className="font-bold">Rejected: <span className="text-red-500">7</span></p>
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
            <StudentRequestActivity/>
          </div>
      </div>
    </div>
  );
};

export default Admin;
