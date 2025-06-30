import React from "react";
import { Link } from "react-router-dom";
import logo from "./logos 1.png";

interface NavbarPros {
    onLogout:() => void;
    userName: string;
}

const Navbar: React.FC<NavbarPros> = ({onLogout, userName}) => {
    return (
        <nav className="navbar">
            <div className="navbar-left">
                <img src={logo} alt="Logo" className="logo"/>
                <span className="username">{userName}</span>
            </div>
            
            <ul className="navbar-menu">
                <li><Link to="/">Inicio</Link></li>
                <li><Link to="/about">Sobre Nosotros</Link></li>
                <li><Link to="/gallery">Galeria</Link></li>
                <li><button onClick={onLogout} className="logout-button">Cerrar Sesion</button></li>
            </ul>
        </nav>
    );
};

export default Navbar;