import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Animal {
  id: number;
  name: string;
  species: string;
  age: number;
  status: string;
  img?: string;
}

const AnimalsIndex: React.FC = () => {
  const [animales, setAnimales] = useState<Animal[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAnimales = async () => {
      try {
        const response = await fetch("http://localhost:3000/index/animals", {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error("Error al obtener los animales");
        }

        const data = await response.json();
        setAnimales(data);
      } catch (error) {
        console.error("Error al obtener los animales:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnimales();
  }, []);
  const HandleDelete = async(animal) => {
    try {
      const response = await fetch(`http://localhost:3000/animals/${animal}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Error al obtener los animales");
      }

      const data = await response.json();
      setAnimales(data);
    } catch (error) {
      console.error("Error al obtener los animales:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="animals-container">
      <div className="animals-content">
        <div className="animals-header">
          <div>
            <h1>
              Nuestros <span>Animales</span>
            </h1>
            <p>Encuentra a tu compañero perfecto</p>
          </div>
          <Link to="/create" className="add-animal-button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            Añadir Animal
          </Link>
        </div>

        {animales.length === 0 ? (
          <div className="empty-state">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3>No hay animales registrados</h3>
            <p>Empieza añadiendo un nuevo animal a nuestro refugio.</p>
            <div className="empty-state-action">
              <Link to="/create" className="empty-state-button">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                    clipRule="evenodd"
                  />
                </svg>
                Crear Animal
              </Link>
            </div>
          </div>
        ) : (
          <div className="animals-grid">
            {animales.map((animal) => (
              <div key={animal.id} className="animal-card">
                <div className="animal-image-container">
                  <img
                    src={`http://localhost:3000${animal.img}`}
                    alt={animal.name}
                  />

                  <div className="animal-status-badge">
                    <span className={animal.status ? "available" : "adopted"}>
                      {animal.status ? "Disponible" : "Adoptado"}
                    </span>
                  </div>
                </div>
                <div className="animal-details">
                  <div className="animal-name-age">
                    <h2>{animal.name}</h2>
                    <span className="animal-age-badge">
                      {animal.age} {animal.age === 1 ? "año" : "años"}
                    </span>
                  </div>
                  <p className="animal-species">
                    <span>Especie:</span> {animal.species}
                  </p>
                  <p className="animal-species">
                    <span>Edad:</span> {animal.age}
                  </p>

                  <div className="animal-action">
                    <button
                      type="button"
                      onClick={() => HandleDelete(animal.id)}
                      className="details-button delete"
                    >
                      Eliminar
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                      </svg>
                    </button>
                    <Link
                      to={`/edit/${animal.id}`}
                      className="details-button edit"
                    >
                      Editar
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AnimalsIndex;
