import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
import Navbar from "./Navbar";
import About from "./About";
import Gallery from "./Gallery";
import "./styles 1.css";
import Register from "./Register";
import AnimalsIndex from "./Index";
import CreateAnimal from "./Create";
import EditAnimal from "./Edit";
const App: React.FC = () => {
  const savedAuth = localStorage.getItem("isAuthenticated") === "true";
  const savedUserName = localStorage.getItem("userName") || "";
  const [isAuthenticated, setIsAuthenticated] = useState(savedAuth);
  const [userName, setUserName] = useState(savedUserName);

  const handleLogin = async (email: string, password: string) => {
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) throw new Error("Login fallido");

      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("userName", email);
      alert("Login exitoso");
      location.reload();
    } catch (error) {
      alert(error);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserName("");
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userName");
  };

  return (
    <Router>
      {isAuthenticated && (
        <Navbar onLogout={handleLogout} userName={userName} />
      )}
      <div className="content-container">
        <div className="content">
          <Routes>
            {!isAuthenticated ? (
              <>
                <Route path="/*" element={<Login onLogin={handleLogin} />} />
                <Route path="/register" element={<Register />} />
              </>
            ) : (
              <>
                <Route path="/" element={<Home userName={userName} />} />
                <Route path="/about" element={<About />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/login" element={<Navigate to="/" />} />
                <Route path="/index" element={<AnimalsIndex />} />
                <Route path="/create" element={<CreateAnimal />} />
                <Route path="/index" element={<AnimalsIndex />} />
                <Route path="/edit/:id" element={<EditAnimal />} />

              </>
            )}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
