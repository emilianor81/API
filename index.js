require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');

//Crear el servidor Express
const app = express();

// Configurar CORS
app.use(cors());

// Carpeta publica
app.use(express.static('public'))

//lectura y parseo del body
app.use( express.json());

// Base de datos
dbConnection();

//Rutas
app.use('/login' , require('./routes/auth'))
app.use('/usuarios' , require('./routes/usuarios'))
app.use('/negocio' , require('./routes/negocio'))

//Server

app.listen(process.env.PORT , ()=>{
    console.log('Server listening in port 3000')
})
