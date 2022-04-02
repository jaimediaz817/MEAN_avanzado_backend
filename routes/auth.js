/* 
    Path: '/api/auth
*/

const { Router } = require('express');
const router = Router();
const { check } = require('express-validator');
const { 
    login,
    googleSignIn
 } = require('../controllers/auth');
 const { fieldValidate } = require('../middlewares/fields-validate');

router.post('/login', [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    fieldValidate
], login);

router.post('/login/google', [
    check('token', 'El token de Google es obligatorio').not().isEmpty(),
    fieldValidate
], googleSignIn);

module.exports = router;