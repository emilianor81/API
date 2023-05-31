require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');

//Crear el servidor Express
const app = express();

// Configurar CORS
app.use(cors());

// Base de datos
dbConnection();
console.log( 'Hola', process.env.PORT);


//Rutas
app.get('/', (req, res)=> {
    res.json({
        ok: true,
        msg: 'Hola Mundo HErmosoooo, que lujo vivir asi'
    })

})



app.listen(3000 , ()=>{
    console.log('Server listening in port 3000')
})
