const express = require("express");
const cors = require("cors");
const db = require("./database");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// Obtener todos los usuarios
app.get("/api/users", (req, res) => {
  db.all("SELECT * FROM users", (err, rows) => {
    if (err) return res.status(500).json({ error: err });
    res.json(rows);
  });
});

// Agregar usuario
app.post("/api/users", (req, res) => {
  const { name, email } = req.body;
  db.run("INSERT INTO users (name, email) VALUES (?, ?)", [name, email], function(err){
    if (err) return res.status(500).json({ error: err });
    res.json({ id: this.lastID });
  });
});

app.listen(3000, () => console.log("Servidor ONLINE en http://localhost:3000"));
