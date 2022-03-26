// DOTENV CONFIG
require('dotenv').config();
const express = require('express');
const { dbConnection } = require('./database/config');

var cors = require('cors');

// Crear el servidor 
const app = express();

// TODO: cors - middleware - fn que se va a ejecutar para todo lo que está debajo (funciones)
app.use( cors() );


// Test DB:CONNECTION
dbConnection();

// Rutas
app.get('/', (req, res) => {
    // ejecutar cuando se haga solicitud
    return res.status(201).json({ test: 817 });
});

app.listen( process.env.PORT || 3000, () => {
    console.log('Corriendo en el puerto: ', process.env.PORT || 3000);
});

//process.env.PORT 