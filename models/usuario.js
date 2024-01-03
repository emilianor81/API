const { Schema , model } = require('mongoose');

const UsuarioSchema = Schema({

    email: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required: true,
    },
    nombre: {
        type: String,
        required: true,
    },
    google: {
        type: Boolean,
    },
})

UsuarioSchema.method( 'toJSON', function(){
    const { __v, _id, password,...object } = this.toObject();
    object.uid = _id;
    return object
} )

module.exports = model( 'Usuario', UsuarioSchema);