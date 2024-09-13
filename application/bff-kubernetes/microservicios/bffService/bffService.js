// bffService.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const corsOptions = {
    origin: 'http://localhost:8080', // Origen permitido
    optionsSuccessStatus: 200 // Algunos navegadores antiguos (IE11, por ejemplo) necesitan esto
  };


const app = express();
const PORT = 3000;

// Middleware para manejar solicitudes JSON
app.use(express.json());

// Configurar CORS con opciones específicas
app.use(cors(corsOptions));


// Ruta para obtener datos del usuario desde el microservicio de usuarios
app.get('/bff/users/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const userResponse = await axios.get(`http://users-service:4000/users/${userId}`);
        res.json(userResponse.data);
    } catch (error) {
        console.error('Error al obtener datos del usuario:', error);
        res.status(500).json({ message: 'Error al obtener datos del usuario' });
    }
});

// Ruta para obtener datos de productos desde el microservicio de productos
app.get('/bff/products', async (req, res) => {
    try {
        const productsResponse = await axios.get('http://products-service:5000/products');
        res.json(productsResponse.data);
    } catch (error) {
        console.error('Error al obtener lista de productos:', error);
        res.status(500).json({ message: 'Error al obtener lista de productos' });
    }
});

app.listen(PORT, () => {
    console.log(`Servicio BFF ejecutándose en http://localhost:${PORT}`);
});

