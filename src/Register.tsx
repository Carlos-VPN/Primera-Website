import React, { useState } from "react";
import "./styles 1.css";
import { useNavigate } from "react-router-dom";
const Register: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) throw new Error("Registro fallido");

   
       alert("Registro exitoso");
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("userName", email);

      navigate("/");
     
    } catch (error) {
      console.log("Error al registrar:", error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-image"></div>
        <div className="login-form">
          <h2>Registrarse</h2>
          <form onSubmit={handleRegister}>
            <div className="input-group">
              <label>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="input-field"
              />
            </div>
            <div className="input-group">
              <label>Contraseñaaaaaaaaaaaa:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="input-field"
              />
            </div>
            <button type="submit" className="login-button">
              Registrarse
            </button>
          </form>
          <div className="login-links">
            <a href="/login">¿Ya tienes cuenta? Inicia sesión</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
