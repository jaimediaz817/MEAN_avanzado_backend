const { response } = require('express');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const { jwtGenerate } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/auth/google-verify');

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
        const token = await jwtGenerate(userDb.id);

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

const googleSignIn = async (req, res = response) => {

    const googleToken = req.body.token;

    try {

        const {
            name,
            email,
            picture
        } = await googleVerify( googleToken );

        const userDb = await User.findOne({ email });
        let user;

        if (!userDb) {
            user = new User({
                name,
                email,
                password: '%%%_googlesignin',
                image: picture,
                google: true
            });
        } else {
            // user exits
            user = userDb;
            user.google = true;
        }

        // save to database
        await user.save();

        // Generate JWT
        const token = await jwtGenerate(user.id);

        return res.json({
            success: true, 
            message: 'Success',
            token
        });        
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success: false, 
            message: 'error: ', error,
        });        
    }
}

module.exports = {
    login,
    googleSignIn
}