/* 
    Ruta: /negocio
*/
const { Router }  = require('express');

const { getUsuariosNegocio   } = require('../controllers/negocio');
 
const router = Router();

router.get('/', getUsuariosNegocio )



module.exports = router;