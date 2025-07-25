import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Login'
import Home from './Home'
import Navbar from './Navbar';
import About from "./About";
import Gallery from './Gallery';
import './styles 1.css'


  const App:React.FC = () => {
    const savedAuth = localStorage.getItem('isAuthenticated') === 'true';
    const savedUserName = localStorage.getItem('userName') || "";
    const [isAuthenticated, setIsAuthenticated] = useState(savedAuth);
    const [userName, setUserName] = useState(savedUserName);
    const validUser = {email:"Carlitos@ucateci.edu.do", password:"123456", name:"Administrador", alias:"Guardian Canino"};

    const handleLogin = (email: String, password: String) => {
      if (email === validUser.email&&password===validUser.password){
        setIsAuthenticated(true);
        setUserName(validUser.alias);
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userName', validUser.alias);
      } else{
        alert("usuario o contraseña incorrectos");
      }
    };

    const handleLogout = () => {
    setIsAuthenticated(false);
    setUserName("");
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userName');
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
