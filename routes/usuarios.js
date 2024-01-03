/* 
    Ruta: /usuarios
*/
const { Router }  = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { getUsuarios , crearUsuario ,actualizarUsuario , borrarUsuario} = require('../controllers/usuarios');
const { validarJWT } = require('../middlewares/validar-jwt');
 
const router = Router();

router.get('/', validarJWT  , getUsuarios)

router.put('/:id',
        validarJWT,
        [
        check('email', 'El email es obligatorio y debe ser email').not().isEmpty(),
        validarCampos,
        ],
        actualizarUsuario
);


router.post('/',
        [
            check('email', 'El email es obligatorio y debe ser email').not().isEmpty(),
            check('password', 'El password es obligatorio').not().isEmpty(),
            validarCampos,
        ],
        crearUsuario
)

router.delete('/:id',
       // validarJWT,
        borrarUsuario
);



module.exports = router;