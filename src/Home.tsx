import React from "react";

interface HomeProps{
    userName: string;
}

const Home : React.FC<HomeProps> = ({userName}) => {
    return (
        <div>
            <h1>Inicio</h1>
            <p>Bienvenido {userName}, este es el sistema del Refugio Animal Vida Nueva, donde damos hogar temporal a mascotas rescatadas,
  brindándoles atención y buscando una familia que los adopte con amor.</p>

        <img src="/Inicio.avif" width={290} height={315} alt="Refugio de animales" />

        </div>
    );
};

export default Home;