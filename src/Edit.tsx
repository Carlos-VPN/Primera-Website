import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
const EditAnimal: React.FC = () => {
     const { id } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    species: "",
    age: "",
    status: true, // true = En adopción, false = Adoptado
    img: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const navigate = useNavigate();
   useEffect(() => {
    const fetchAnimal = async () => {
      try {
        const res = await fetch(`http://localhost:3000/animals/${id}`);
        if (!res.ok) throw new Error("No se pudo cargar el animal");
        const data = await res.json();
        setFormData({
          name: data.name,
          species: data.species,
          age: data.age,
          status: data.status,
          img: data.img || "",
        });
      } catch (error) {
        console.error("Error al cargar el animal:", error);
      }
    };
    if (id) fetchAnimal();
  }, [id]);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("species", formData.species);
    data.append("age", formData.age);
    data.append("status", String(formData.status));
    if (file) data.append("img", file);

    try {
      const response = await fetch(`http://localhost:3000/animals/${id}`, {
        method: "PATCH",
        body: data,
      });

      if (!response.ok) throw new Error("Error al editar el animal");
      alert("Animal editado exitosamente");
      navigate("/index");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="form-container">
      <div className="form-header">
        <h2>Editar  Animal</h2>
        
      </div>

      <form onSubmit={handleSubmit} className="animal-form">
        <div className="form-grid">
          {/* Nombre */}
          <div className="form-group">
            <label htmlFor="name">Nombre del Animal</label>
            <input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Ej: Max, Luna, Toby"
              required
            />
          </div>

          {/* Especie */}
          <div className="form-group">
            <label htmlFor="species">Especie</label>
            <input
              id="species"
              name="species"
              value={formData.species}
              onChange={handleChange}
              placeholder="Ej: Perro, Gato, Conejo"
              required
            />
          </div>

          {/* Edad */}
          <div className="form-group">
            <label htmlFor="age">Edad (años)</label>
            <input
              id="age"
              name="age"
              type="number"
              min="0"
              value={formData.age}
              onChange={handleChange}
              placeholder="Ej: 2"
              required
            />
          </div>

          {/* Estado */}
          <div className="form-group">
            <label htmlFor="status">Estado</label>
            <select
              id="status"
              name="status"
              value={formData.status ? "true" : "false"}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  status: e.target.value === "true",
                }))
              }
            >
              <option value="true">En adopción</option>
              <option value="false">Adoptado</option>
            </select>
          </div>
        </div>

        {/* Imagen */}
        <div className="form-group full-width">
          <label htmlFor="img">URL de la imagen</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            required
          />

          {formData.img && (
            <div className="image-preview">
              <p>Vista previa:</p>
              <img
                src={formData.img}
                alt="Vista previa"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            </div>
          )}
        </div>

        {/* Botón de envío */}
        <div className="form-submit">
          <button type="submit">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
              />
            </svg>
            Editar Animal
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditAnimal;
