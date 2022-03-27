// DOTENV CONFIG
require('dotenv').config();
const express = require('express');
const { dbConnection } = require('./database/config');

var cors = require('cors');

// Crear el servidor 
const app = express();

// TODO: cors - middleware - fn que se va a ejecutar para todo lo que está debajo (funciones)
app.use(cors());

// LECTURA Y PARSEO DEL BODY
app.use(express.json());

// Test DB:CONNECTION
dbConnection();

// Routes
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');

// Rutas
app.use('/api/usuarios', userRoutes);
app.use('/api/auth', authRoutes);
//app.use('/api/usuarios', userRoutes);

app.listen( process.env.PORT || 3000, () => {
    console.log('Corriendo en el puerto: ', process.env.PORT || 3000);
});

//process.env.PORT 