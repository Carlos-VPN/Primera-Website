const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
require("dotenv").config();
const path = require("path");
const fs = require("fs");
const multer = require("multer");

const app = express();
const PORT = 3000;

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: String(process.env.DB_PASSWORD),
    port: Number(process.env.DB_PORT),
});

app.get("/", (req, res) => {
    res.send("API funcionando Correctamente");
});

app.post("/api/register", async (req, res) => {
    const { name,
        email,
        password,
    } = req.body;
})

if (name || !email || !password) {
    return res
        .status(400)
        .json({ message: "Todos los Campos son requeridos" })
}

try {
    const result = await pool.query(
        "INSERT INTO usuarios (nombre, correo, contraseña) VALUES ($1,$2,$3) RETURNING id,nombre,correo",
        [name, email, password]
    )

    res.status(200).json({
        message: "Usuario registrado con exitos"
        user: result.rows[0],
    });
};

await pool.query(
    `INSERT INTO products`
)