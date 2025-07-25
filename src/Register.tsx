import React, { useState } from "react";
import "./styles 1.css";

const Register: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (event: React.FormEvent) => {
    event.preventDefault();
    // Aquí iría tu lógica para registrarse
    console.log("Registro:", email, password);
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
            <button type="submit" className="login-button">Registrarse</button>
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
