import React from "react";
import { Link } from "react-router-dom";
import logo from "./logos 1.png";

interface NavbarPros {
  onLogout: () => void;
  userName: string;
}

const Navbar: React.FC<NavbarPros> = ({ onLogout, userName }) => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src="https://static.vecteezy.com/system/resources/previews/005/893/586/non_2x/stethoscope-and-animal-footprint-veterinary-concept-silhouette-icon-veterinarian-medicine-equipment-glyph-pictogram-pet-dog-cat-health-care-service-icon-isolated-illustration-vector.jpg" alt="Logo" className="logo" />
        <span className="username">{userName}</span>
      </div>

      <ul className="navbar-menu">
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/about">Sobre Nosotros</Link></li>
        <li><Link to="/gallery">Galería</Link></li>
        {/* Aquí ponemos enlace externo para ir al otro proyecto CRUD */}
        <li>
          <a href="http://localhost:5174">CRUD</a>
        </li>
        <li><button onClick={onLogout} className="logout-button">Cerrar Sesión</button></li>
      </ul>
    </nav>
  );
};

export default Navbar;
