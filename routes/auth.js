/* 
    Path: '/api/auth
*/

const { Router } = require('express');
const router = Router();
const { check } = require('express-validator');
const { 
    login
 } = require('../controllers/auth');
 const { fieldValidate } = require('../middlewares/fields-validate');

router.post('/login', [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    fieldValidate

], login);

module.exports = router;