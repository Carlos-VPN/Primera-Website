const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
const bcrypt = require("bcryptjs");
const multer = require('multer');
const path = require('path'); // ✅ ahora está antes de usarlo
require("dotenv").config();

const app = express();
const PORT = 3000;

// ✅ Aquí ya puedes usar `path`
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(cors());
app.use(express.json());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); 
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });
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

app.post("/register", async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({ error: "El usuario ya existe" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query("INSERT INTO users (email, password) VALUES ($1, $2)", [
      email,
      hashedPassword,
    ]);

    res.json({ message: "Registro exitoso" });
  } catch (error) {
    console.error("Error en el registro:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const userResult = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (userResult.rows.length === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const user = userResult.rows[0];

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }

    res.json({ message: "Login exitoso", userId: user.id });
  } catch (error) {
    console.error("Error en el login:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

app.get("/index/animals", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM animals");
    res.json(result.rows); 
  } catch (error) {
    console.error("Error al obtener registros:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});
app.post('/create/animals', upload.single('img'), async (req, res) => {
  const { name, species, age, status } = req.body;
  const img = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    const result = await pool.query(
      'INSERT INTO animals (name, species, age, status, img) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, species, age, status, img]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error al crear animal:', error);
    res.status(500).json({ error: 'Error al registrar el animal' });
  }
});
app.get('/animals/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('SELECT * FROM animals WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Animal no encontrado' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al obtener animal:', error);
    res.status(500).json({ error: 'Error al buscar el animal' });
  }
});
app.delete('/animals/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      'DELETE FROM animals WHERE id = $1 RETURNING *',
      [id]
    );

   

    res.json({ message: 'Animal eliminado correctamente', animal: result.rows[0] });
  } catch (error) {
    console.error('Error al eliminar animal:', error);
    res.status(500).json({ error: 'Error al eliminar el animal' });
  }
});

app.patch('/animals/:id', upload.single('img'), async (req, res) => {
  const { id } = req.params;
  const { name, species, age, status } = req.body;
  const img = req.file ? `/uploads/${req.file.filename}` : null;

  try {

    const current = await pool.query('SELECT * FROM animals WHERE id = $1', [id]);
    if (current.rows.length === 0) {
      return res.status(404).json({ error: 'Animal no encontrado' });
    }

  
    const finalImg = img || current.rows[0].img;

    const result = await pool.query(
      `UPDATE animals 
       SET name = $1, species = $2, age = $3, status = $4, img = $5
       WHERE id = $6
       RETURNING *`,
      [name, species, age, status, finalImg, id]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al editar animal:', error);
    res.status(500).json({ error: 'Error al editar el animal' });
  }
});

app.listen(PORT, () => {
  console.log(`Escuchando puerto ${PORT}`);
});
