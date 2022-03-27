const { response } = require('express');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const { jwtGenerate } = require('../helpers/jwt');

const login = async (req, res = response) => {
    
    const { email, password } = req.body;

    try {

        // verificar email
        const userDb = await User.findOne({ email });        

        if (!userDb) {
            return res.status(404).json({
                success: false,
                message: 'Email no encontrado.'
            });
        }

        // verificar password
        const validPassword = bcrypt.compareSync(password, userDb.password);        
        if (!validPassword) {
            return res.status(404).json({
                success: false,
                message: 'Password no válido.'
            });            
        }

        // generar TOKEN
        const token = await jwtGenerate(userDb.id)

        res.json({
            success: true,
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Error inesperado, comunicarse con el administrador.'
        })
    }
};

module.exports = {
    login
}