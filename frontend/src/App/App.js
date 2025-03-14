import "@fortawesome/fontawesome-free/css/all.min.css";



import Register from "../pages/Register";

import Dashboard2 from "../pages/Dashboard2";

import StudentHome from "../pages/StudentHome";

import Login from "../pages/Login";

import ApplyLeave from "../pages/ApplyLeave";

import Footer from "../components/Footer";



import { BrowserRouter, Routes, Route } from "react-router-dom";

import Admin from "./../pages/Admin";

function App() {
  return (
    <main id="app">
      <BrowserRouter>
        <Routes>
        
          <Route path="/Student" element={<StudentHome />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/apply" element={<ApplyLeave />} />
          <Route path="/admin" element={<Admin />} />
         
          <Route path="/" element={<Dashboard2/>}/>
        </Routes>
       
      </BrowserRouter>
      <Footer/>
     
      
    </main>
  );
}

export default App;
