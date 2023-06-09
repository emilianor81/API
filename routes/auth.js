/* 
    Path : '/login'
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { login  } = require('../controllers/auth')

const router = Router();


router.post('/',
        [
            check('email', 'El email es obligatorio y debe ser email').isEmail(),
            check('password', 'El password es obligatorio').not().isEmpty(),
            validarCampos,
        ],
        login
)



module.exports = router;