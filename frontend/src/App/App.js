
import Register from '../pages/Register';

import StudentHome from '../pages/StudentHome';

import Login from '../pages/Login';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
       
import ApplyLeave from '../pages/ApplyLeave';

function App() {
  return (
    <main id="app">
      <BrowserRouter>
        <Routes>
         
          <Route path="/Student" element={<StudentHome />} />
          <Route path="/Register" element={<Register/>}/>
          <Route path="/login" element={<Login/>} />
          <Route path='/apply' element ={<ApplyLeave/>}/>
          </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
