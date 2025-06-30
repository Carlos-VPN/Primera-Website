import React from "react";

const Gallery: React.FC = () => {
    return(
        <div className="gallery-container">
            <h2>Galeria de nuestros animales</h2>
            <div className="gallery-grid">
            <img src="/public/Tortuga.jpg" alt="Tortuga Riendo" />
            <img src="/public/Vaca.jpg" alt="Vaca Riendo" />
            <img src="/public/Rana.jpg" alt="Rana Feliz" />
            </div>
        </div>
    );
};

export default Gallery;