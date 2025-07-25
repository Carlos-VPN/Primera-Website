const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const app = express();
const PORT = 3000;


app.use(cors());
app.use(express.json()); 


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


app.post('/register', async (req, res) => {
   
    const { email, password } = req.body;

    try {
        const existingUser = await pool.query(
            'SELECT * FROM users WHERE email = $1',
            [email]
        );

        if (existingUser.rows.length > 0) {
            return res.status(400).json({ error: 'El usuario ya existe' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await pool.query(
            'INSERT INTO users (email, password) VALUES ($1, $2)',
            [email, hashedPassword]
        );

        res.json({ message: 'Registro exitoso' });
    } catch (error) {
        console.error('Error en el registro:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});


app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const userResult = await pool.query(
            'SELECT * FROM users WHERE email = $1',
            [email]
        );

        if (userResult.rows.length === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        const user = userResult.rows[0];

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            return res.status(401).json({ error: 'Contraseña incorrecta' });
        }

        res.json({ message: 'Login exitoso', userId: user.id });
    } catch (error) {
        console.error('Error en el login:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});


app.listen(PORT, () => {
    console.log(`Escuchando puerto ${PORT}`);
});
