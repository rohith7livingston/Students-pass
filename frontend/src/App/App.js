import "@fortawesome/fontawesome-free/css/all.min.css";


import Register from "../pages/Register";

import StudentHome from "../pages/StudentHome";

import Login from "../pages/Login";

import ApplyLeave from "../pages/ApplyLeave";

import Departments from "../pages/Departments";

import Dashboard from "../pages/Dashboard";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Admin from "./../pages/Admin";

function App() {
  return (
    <main id="app">
      <BrowserRouter>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/Student" element={<StudentHome />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/apply" element={<ApplyLeave />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
