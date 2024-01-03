const { response } = require('express');
const bcrypt = require('bcryptjs')


const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');


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
            return res.status(400).json({
                ok:false,
                message: 'Usuario o contraseña no valido'
            })
        }

        //Generar un token
        const token = await generarJWT( usuarioDB.id );

        res.json({
          ok:true,
          token
        })
        
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg: 'Hable con el admin'
        })
    }
}

const loginGoogle = async (req, res)=> {
    try {

        const { email, name, picture } =  await googleVerify( req.body.token)

        const existeUsuario = await Usuario.findOne({email});

        let usuario;

        if(!existeUsuario){
            usuario = new Usuario({
                nombre: name,
                email,
                password:'@@@',
                google: true,
            })
        }else{
            usuario = existeUsuario;
            usuario.google = true;
        }

        //Guardar Usuario

        await usuario.save();

        // Generar JWT
        const token = await generarJWT( usuario.id );  


        res.json({
            ok: true,
            email,name, picture,token
        })
        
    } catch (error) {
        return res.status(200).json({
            ok: false,
            msg: 'Token de google no es correcto'
        })          
    }
}

module.exports = {
    login,
    loginGoogle,
}