/* 
    RUTA: /api/hospitals
*/

const { Router } = require('express');
const { check } = require('express-validator');
 const { fieldValidate } = require('../middlewares/fields-validate');
 const { validateJWT } = require('../middlewares/validate-jwt');

const { 
    getHospitals,
    setHospital,
    updateHospital,
    deleteHospital
 } = require('../controllers/hospitals');

const router = Router();

router.get('/', validateJWT, getHospitals);

router.post('/', 
    [
        validateJWT,
        check('name', 'El nombre del hospital es obligatorio').not().isEmpty(),
        fieldValidate
    ], 
    setHospital
);

router.put('/:id', 
    [

    ], 
    updateHospital
);

router.delete('/:id/:typeDeleted', validateJWT, deleteHospital);

module.exports = router;