
import Register from '../pages/Register';

import StudentHome from '../pages/StudentHome';

import Login from '../pages/Login';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
       
function App() {
  return (
    <main id="app">
      <BrowserRouter>
        <Routes>
         
          <Route path="/Student" element={<StudentHome />} />
          <Route path="/Register" element={<Register/>}/>
          <Route path="/login" element={<Login/>} />

          </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
