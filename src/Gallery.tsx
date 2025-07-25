import React from "react";
import { PawPrint } from "lucide-react"; // Puedes quitar esta línea si no quieres el ícono

const Gallery: React.FC = () => {
  return (
    <section className="gallery-container">
      <div className="gallery-header">
        <PawPrint size={36} color="#007bff" style={{ marginBottom: '10px' }} />
        <h2>Galería de Nuestros Animales</h2>
        <p className="gallery-subtitle">Sonrisas, patas y aventuras inolvidables</p>
      </div>

      <div className="gallery-grid">
        <div className="gallery-item">
          <img src="/Tortuga.jpg" alt="Tortuga Riendo" />
          <span>Tortuga feliz</span>
        </div>
        <div className="gallery-item">
          <img src="/vaca.jpg" alt="Vaca Riendo" />
          <span>Vaca sonriendo</span>
        </div>
        <div className="gallery-item">
          <img src="/Rana.jpg" alt="Rana Feliz" />
          <span>Rana curiosa</span>
        </div>
        <div className="gallery-item">
          <img src="/chiha.jpg" alt="Perrito en veterinaria" />
          <span>Perrito encantador</span>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
