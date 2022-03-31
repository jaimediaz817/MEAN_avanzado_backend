/* 
    RUTA: /api/doctors
*/

const { Router } = require('express');
const { check } = require('express-validator');
 const { fieldValidate } = require('../middlewares/fields-validate');
 const { validateJWT } = require('../middlewares/validate-jwt');

const { 
    getDoctors,
    setDoctor,
    updateDoctor,
    deleteDoctor
 } = require('../controllers/doctors');

const router = Router();

router.get('/', validateJWT, getDoctors);

router.post('/', 
    [
        validateJWT,
        check('name', 'El nombre del doctor es obligatorio').not().isEmpty(),
        check('hospital', 'El hospital es obligatorio').not().isEmpty(),
        check('hospital', 'El hospital debe tener un ID válido').isMongoId(),
        fieldValidate
    ], 
    setDoctor
);

router.put('/:id', 
    [

    ], 
    updateDoctor
);

router.delete('/:id/:typeDeleted', validateJWT, deleteDoctor);

module.exports = router;