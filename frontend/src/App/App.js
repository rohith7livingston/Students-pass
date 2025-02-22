

// import Register from './../pages/Register'
import StudentHome from '../pages/StudentHome';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
       
function App() {
  return (
    <main id="app">
      <BrowserRouter>
        <Routes>
          {/* <Route path="/register" element={<Register />} /> */}
          <Route path="/Student" element={<StudentHome />} />
          
          </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
