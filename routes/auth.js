/* 
    Path : '/login'
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const { login  } = require('../controllers/auth')

const router = Router();

router.get('/', validarJWT,  ()=> {
    console.log('Estoy en el routes de get login')
})

/* router.get('/', validarJWT,  getUsuarios )
 */

router.post('/',
        [
            check('email', 'El email es obligatorio y debe ser email').isEmail(),
            check('password', 'El password es obligatorio').not().isEmpty(),
            validarCampos,
        ],
        login
)



module.exports = router;