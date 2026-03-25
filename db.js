const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("database.db", (err) => {
  if (err) console.error("Error conectando:", err.message);
  else console.log("Base de datos conectada");
  db.run("PRAGMA foreign_keys = ON");
});

db.run(`CREATE TABLE IF NOT EXISTS Categorias (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre TEXT
)`);

db.run(`CREATE TABLE IF NOT EXISTS Productos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  id_categoria INTEGER,
  nombre TEXT,
  precio REAL,
  descripcion TEXT,
  FOREIGN KEY (id_categoria) REFERENCES Categorias(id)
)`);

module.exports = db;