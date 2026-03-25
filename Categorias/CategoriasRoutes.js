const express = require("express");
const Routes = express.Router();
const db = require("../db");

const categorias = [
  { id: 1,  nombre: "Tecnologia" },
  { id: 2,  nombre: "Hogar" }
];


// 🔹 Obtener categorías con búsqueda
Routes.get("/categorias", (req, res) => {
const { nombre } = req.query;

db.all("SELECT * FROM Categorias", [], (err, rows) => {
if (err) {
  return res.status(500).json({ success: false, message: err.message });
}

const filtered = rows.filter(c =>
  !nombre || c.nombre.toLowerCase().includes(nombre.toLowerCase())
);

res.json({ success: true, data: filtered });
});
});

// 🔹 Crear categoría
Routes.post("/categorias", (req, res) => {
const { nombre } = req.body;

if (!nombre) {
return res.status(400).json({ success: false, message: "Nombre requerido" });
}

db.run(
"INSERT INTO Categorias (nombre) VALUES (?)",
[nombre],
function (err) {
  if (err) {
    return res.status(500).json({ success: false, message: err.message });
  }

  res.json({
    success: true,
    data: { id: this.lastID, nombre },
  });
}
);
});

module.exports = Routes;