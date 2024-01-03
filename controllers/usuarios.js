const { response } = require('express');
const bcrypt = require('bcryptjs')
const { generarJWT , generarJWTUser } = require('../helpers/jwt');
const axios = require('axios')


const Usuario = require('../models/usuario')


const getUsuarios = async (req, res)=> {
    try {
        const usuarios = await Usuario.find();
        return res.json({
            ok: true,
            usuarios: [usuarios],
        }) 
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
        const token = await generarJWT( usuario._id );  
        res.json({
            ok: true,
            usuario: [usuario],
            msg: 'Usuario registrado con éxito',
            token
        }) 

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado, revisar logs'
        })
    }


    

}

const actualizarUsuario = async (req, res)=> {
    const uid = req.params.id;
    try {
        const usuarioUpdate = await Usuario.findById( uid);
        if (!usuarioUpdate) {
            return res.status(404).json({
                ok: false,
                message: 'El correo no está registrado'
            });
          }
        //Actualizaciones
        const {password, ...campos} = req.body;
        if(usuarioUpdate.email === req.body.email){
            delete campos.email;
        }else{
            const existeEmail = await Usuario.findOne({ email: req.body.email })
            if(existeEmail){
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese mail. No es posible actualizar'
                })
            }
        }
        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid , campos , {new : true});

        return res.json({
            ok: true,
            usuario: usuarioActualizado,
        }) 
       
    } catch (error) {
        console.log(error)
    }
}

const borrarUsuario = async (req, res)=> {
    const uid = req.params.id;
    try {
        const usuarioDelete = await Usuario.findById( uid);
        if (!usuarioDelete) {
            return res.status(404).json({
                ok: false,
                message: 'El correo no está registrado'
            });
        }
        //Borrar
        await Usuario.findByIdAndDelete( uid )
        
        return res.status(200).json({
            ok: true,
            message: 'Usuario eliminado con éxito'
        });
   
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario
}