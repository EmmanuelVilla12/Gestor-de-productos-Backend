const express = require("express");
const Routes = express.Router();
const db = require("../db");

const productos = [
  { id: 1, nombre: "Laptop", precio: 2500, descripcion: "Gaming", id_categoria: 1 },
  { id: 2, nombre: "Camiseta", precio: 50, descripcion: "Algodón", id_categoria: 1 },
  { id: 3, nombre: "Nevera", precio: 1200, descripcion: "Grande", id_categoria: 1 }
];

Routes.get('/productos', (req, res) => {
  const filtros = req.query;

db.all("SELECT * FROM Productos", [], (err, rows) => {
  if (err) {
    return res.status(500).json({ success: false, message: err.message });
  }

  let filtered = rows.filter((row) => {
    return Object.entries(filtros).every(([key, value]) => {
      if (!value) return true;

      const campo = row[key];

      return (
        campo &&
        campo.toString().toLowerCase().includes(value.toLowerCase())
      );
    });
  });

  res.json({ success: true, data: filtered });
});
});


Routes.post("/productos", (req, res) => {
  const { nombre, precio, descripcion, id_categoria } = req.body;

  if (!nombre || !precio || !descripcion || !id_categoria) {
    return res.status(400).json({
      success: false,
      message: 'nombre, precio, descripcion y id_categoria son obligatorios'
    });
  }

  db.run(
    'INSERT INTO Productos (nombre, precio, descripcion, id_categoria) VALUES (?, ?, ?, ?)',
    [nombre, precio, descripcion, id_categoria],
    function(err) {
      if (err) return res.status(500).json({ success: false, message: err.message });

      res.status(201).json({
        success: true,
        data: { id: this.lastID, nombre, precio, descripcion, id_categoria }
      });
    }
  );
});


Routes.put('/productos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { nombre, precio, descripcion, id_categoria } = req.body;


  db.run(
    `UPDATE Productos 
     SET nombre = ?, precio = ?, descripcion = ?, id_categoria = ?
     WHERE id = ?`,
    [nombre, precio, descripcion, id_categoria, id],
    function (err) {
      if (err) {
        return res.status(500).json({ success: false, message: err.message });
      }

      if (this.changes === 0) {
        return res.status(404).json({ success: false, message: 'Producto no encontrado' });
      }

      res.json({ success: true });
    }
  );
});

Routes.delete('/productos/:id', (req, res) => {
  const id = parseInt(req.params.id);


  db.run("DELETE FROM Productos WHERE id = ?", [id], function (err) {
    if (err) {
      return res.status(500).json({ success: false, message: err.message });
    }

    if (this.changes === 0) {
      return res.status(404).json({ success: false, message: 'producto no encontrado' });
    }

    res.json({ success: true });
  });
});

module.exports = Routes;