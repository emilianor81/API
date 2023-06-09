const { response } = require('express');
const bcrypt = require('bcryptjs')
const { generarJWT , generarJWTUser } = require('../helpers/jwt');
const axios = require('axios')


const Usuario = require('../models/usuario')


const getUsuarios = async (req, res)=> {
    try {
        //Generar un token
        const businessToken = await generarJWT( req.uid );
       
        const response = await axios.get('http://localhost:3000/negocio'
        , {
        headers: {
            authorization: `Bearer ${businessToken}`,
            uid: req.uid,
        },
        }
        );
        res.json(response.data);
       
    } catch (error) {
        console.log(error)
    }
}

const crearUsuario = async (req, res = response )=> {
    const { email , password } = req.body;
    try {
        const existeUsuario = await Usuario.findOne({email});
        if (existeUsuario) {
            return res.status(409).json({ message: 'El correo ya está registrado' });
          }
        const usuario = new Usuario( req.body)
        
        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password , salt);

        //Guardar usuario
        await usuario.save(); 

         //Generar un token
         const token = await generarJWT( usuario.id );
    
        res.json({
            ok: true,
            usuario: [usuario],
            msg: 'Usuario registrado con éxito',
            token
        }) 

    } catch (error) {

        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado, revisar logs'
        })
    }


    

}

module.exports = {
    getUsuarios,
    crearUsuario
}