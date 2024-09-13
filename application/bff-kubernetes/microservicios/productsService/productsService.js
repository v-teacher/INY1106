// productsService.js
const express = require('express');
const AWS = require('aws-sdk');

const app = express();
const PORT = 5000;

// Configuración de DynamoDB
AWS.config.update({
    region: 'us-east-1',  // Cambia a tu región
});

const dynamoClient = new AWS.DynamoDB.DocumentClient();
const PRODUCTS_TABLE = "Products";

// Endpoint para obtener la lista de productos
app.get('/products', async (req, res) => {
    const params = {
        TableName: PRODUCTS_TABLE
    };

    try {
        const data = await dynamoClient.scan(params).promise();
        console.log(data.Items);
        res.json(data.Items);
    } catch (error) {
        console.error('Error al obtener lista de productos:', error);
        res.status(500).json({ message: 'Error al obtener lista de productos' });
    }
});

app.listen(PORT, () => {
    console.log(`Microservicio de Productos ejecutándose en http://localhost:${PORT}`);
});
