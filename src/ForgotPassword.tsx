import React from 'react';
import { Link } from 'react-router-dom';

const ForgotPassword: React.FC = () => {
  return (
    <div className="form-container">
      <div className="form-box">
        <div className="form-image" style={{ backgroundImage: "url('./RSC.png')" }} />
        <h2>Recuperar Contraseña</h2>
        <form className="form-form">
          <div className="input-group">
            <label htmlFor="email">Ingresa tu email:</label>
            <input type="email" id="email" className="input-field" />
          </div>
          <button type="submit" className="form-button">Enviar enlace</button>
        </form>
        <div className="form-links">
          <Link to="/login">Volver al login</Link>
      </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
