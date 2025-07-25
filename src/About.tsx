import React from "react";

const About: React.FC = () => {
  return (
    <div className="section-container">
      <h1 className="section-title">Sobre Nosotros</h1>
      <p className="section-text">
        Somos un refugio dedicado a <b>rescatar, cuidar</b> y dar en <b>adopción</b> animales abandonados.
        Nuestro equipo trabaja día a día para darles una <b>segunda oportunidad</b> a perros y gatos que lo necesitan.
      </p>

      <img
        src="./public/Perro Rubio.jpg"
        alt="Perro rescatado"
        className="section-image"
      />
    </div>
  );
};

export default About;
