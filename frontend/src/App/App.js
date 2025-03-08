
import Register from '../pages/Register';

import StudentHome from '../pages/StudentHome';

import Login from '../pages/Login';

import ApplyLeave from '../pages/ApplyLeave';

//Admins
import AdminLogin from './../pages/AdminLogin.jsx'
import Admin from '../pages/Admin.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
       
function App() {
  return (
    <main id="app">
      <BrowserRouter>
        <Routes>
         
          <Route path="/Student" element={<StudentHome />} />
          <Route path="/Register" element={<Register/>}/>
          <Route path="/login" element={<Login/>} />
          <Route path='/apply' element={<ApplyLeave/>}/>
          <Route path='/adminlogin' element={<AdminLogin/>}/>
          <Route path='/admin' element={<Admin/>}/>
          </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
