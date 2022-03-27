/* 
    RUTA: /api/usuarios
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { 
    getUsers,
    setUser,
    updateUser,
    deleteUser
 } = require('../controllers/users');
 const { fieldValidate } = require('../middlewares/fields-validate');
 const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

router.get('/', validateJWT, getUsers);

router.post('/', 
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'La contraseña es obligatoria').not().isEmpty(),
        check('email', 'el Email es obligatorio y debe tener un formato correcto').isEmail(),
        fieldValidate
    ], 
    setUser
);

router.put('/:id', 
    [
        validateJWT,
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El Email es obligatorio').isEmail(),
        check('role', 'El rol es obligatorio').not().isEmpty(),
        fieldValidate
    ], 
    updateUser
);

router.delete('/:id/:typeDeleted', validateJWT, deleteUser);

module.exports = router;