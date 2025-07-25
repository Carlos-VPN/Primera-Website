import React from "react";

interface HomeProps {
  userName: string;
}

const Home: React.FC<HomeProps> = ({ userName }) => {
  return (
    <div className="section-container">
      <h1 className="section-title">Inicio</h1>
      <p className="section-text">
        Bienvenido <strong>{userName}</strong>, este es el sistema del <b>Refugio Animal Vida Nueva</b>, donde damos hogar temporal a mascotas rescatadas, brindándoles atención y buscando una familia que los adopte con amor.
      </p>

      <img
        src="/Inicio.avif"
        alt="Refugio de animales"
        className="section-image"
      />
    </div>
  );
};

export default Home;
