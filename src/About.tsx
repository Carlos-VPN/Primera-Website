import React from "react";

const About: React.FC = () => {
    return(
        <div className="about">
            <h1>Sobre Nosotros</h1>
            <p>Somos un refugio dedicado a rescatar, cuidar y dar en adopción animales abandonados.
                Nuestro equipo trabaja día a día para darles una segunda oportunidad a perros y gatosque lo necesitan.</p>
            <br></br>
        <img src="./public/Perro Rubio.jpg" width={350} height={250} ></img>
        </div>

    );
};

export default About;