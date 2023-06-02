// businessController.ts

const { response } = require('express');
const bcrypt = require('bcryptjs')
const Usuario = require('../models/usuario');
const jwt = require('jsonwebtoken')



const getUsuariosNegocio = async (req, res = response )=> {
    const authToken = req.headers.authorization?.split(' ')[1];
    try {
    // Verificar si no se proporciona un token de autenticación
    if (!authToken) {
      return res.status(401).json({ message: 'Acceso no autorizado' });
    }
    const verifyToken = jwt.verify(authToken , process.env.JWT_SECRET);
    if (!verifyToken) {
        return res.status(401).json({ message: 'Token de autenticación inválido' });
    }
    const users = await Usuario.find();
    res.json(users);
    } catch (error) {
    console.log(error)
    }

}

module.exports = {
    getUsuariosNegocio
}
