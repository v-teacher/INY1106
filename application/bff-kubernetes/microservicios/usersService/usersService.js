// usersService.js
const express = require('express');
const AWS = require('aws-sdk');

const app = express();
const PORT = 4000;

// Configuración de DynamoDB
AWS.config.update({
    region: 'us-east-1',  // Cambia a tu región
});

const dynamoClient = new AWS.DynamoDB.DocumentClient();
const USERS_TABLE = "Users";

// Endpoint para obtener datos de un usuario específico
app.get('/users/:id', async (req, res) => {
    const userId = req.params.id;

    const params = {
        TableName: USERS_TABLE,
        Key: { UserId: userId }
    };

    try {
        const { Item } = await dynamoClient.get(params).promise();
        if (Item) {
            res.json(Item);
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        console.error('Error al obtener datos del usuario:', error);
        res.status(500).json({ message: 'Error al obtener datos del usuario' });
    }
});

app.listen(PORT, () => {
    console.log(`Microservicio de Usuarios ejecutándose en http://localhost:${PORT}`);
});
