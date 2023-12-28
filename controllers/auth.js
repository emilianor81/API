const { response } = require('express');
const bcrypt = require('bcryptjs')


const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');


const login = async (req, res)=> {
    const { email , password } = req.body;
    try {
        const usuarioDB = await Usuario.findOne({email})

        //Verificar usuario existente
        if(!usuarioDB){
            return res.status(500).json({
                ok:false,
                msg: 'Usuario o contraseña no valido'
            })
        }

        //Verificar password
        const validPassword = bcrypt.compareSync( password, usuarioDB.password)

        if(!validPassword){
            res.status(400).json({
                ok:false,
                msg: 'Usuario o contraseña no valido'
            })
        }

        //Generar un token
        const token = await generarJWT( usuarioDB.id );

        res.json({
          ok:true,
          token
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg: 'Hable con el admin'
        })
    }
}



module.exports = {
    login,
}