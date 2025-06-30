import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Login'
import Home from './Home'
import Navbar from './Navbar';
import About from "./About";
import Gallery from './Gallery';
import './styles 1.css'


  const App:React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userName, setUserName] = useState("");
    const validUser = {email:"Carlitos@ucateci.edu.do", password:"123456", name:"Administrador"};

    const handleLogin = (email: String, password: String) => {
      if (email === validUser.email&&password===validUser.password){
        setIsAuthenticated(true);
        setUserName(validUser.name);
      } else{
        alert("usuario o contraseña incorrectos");
      }
    };

    const handleLogout = () => {
    setIsAuthenticated(false);
    setUserName("");
    };


    return (
    <Router>
      {isAuthenticated && <Navbar onLogout={handleLogout} userName={userName} />}
      <div className="content-container">
        <div className="content">
          <Routes>
            {!isAuthenticated ? (
              <Route path="/*" element={<Login onLogin={handleLogin} />} />
            ) : (
              <>
                <Route path="/" element={<Home userName={userName} />} />
                <Route path="/about" element={<About />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/login" element={<Navigate to="/" />} />
              </>
            )}
          </Routes>
        </div>
      </div>
    </Router>
  );
};


export default App;
