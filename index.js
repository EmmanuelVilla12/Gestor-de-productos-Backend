const express = require('express');
const app = express();
require ('dotenv').config();
const port = process.env.PORT;
const cors = require('cors');


app.use(cors());
const CategoriasRoutes = require('./Categorias/CategoriasRoutes');
const ProductosRoutes = require('./Productos/ProductosRoutes');
app.use(express.json());


app.use('/api',CategoriasRoutes);
app.use('/api',ProductosRoutes);


// Iniciar servidor
app.listen(port, () => console.log('API arriba!'));