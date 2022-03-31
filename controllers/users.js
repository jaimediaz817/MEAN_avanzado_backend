const { response } = require('express');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const { jwtGenerate } = require('../helpers/jwt');

/**
 * Get all users
 * 
 * @param {*} req 
 * @param {*} res 
 */
const getUsers = async (req, res) => {
    // paginación
    const from = Number(req.query.from);
    const to = Number(req.query.to);

    // coleccion de promesas en lo s que se puede poner en await 
    const [ users, total ] = await Promise.all([
        User.find({}, 'name email role google image status_deleted')
            .skip(from)
            .limit(5),

        User.countDocuments()
    ]);    

    res.json({
        success: true,
        users,
        total
    });
}

/**
 * Save User by POST method
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const setUser = async (req, res = response) => {
    const { email, password } = req.body;    

    try {
        const emailValidate = await User.findOne({ email });

        if (emailValidate) {
            return  res.status(400).json({
                        success: false,
                        message: 'El correo ya está registrado en la plataforma.'
                    });
        }

        const user = new User(req.body);

        // encriptando pass
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        await user.save();

        // token
        const token = await jwtGenerate(user.id);

        // response
        res.json({
            success: true,
            user,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Error inesperado, revisar los logs.'
        });
    }
};

/**
 * Update user by UserID
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const updateUser = async (req, res = response) => {

    // TODO: validar token

    const uid = req.params.id;    

    // flujo UPDATE
    try {
        const usuarioDb = await User.findById(uid);

        if (!usuarioDb) {
            return res.status(404).json({
                success: false,
                message: 'No existe el usuario en la base de datos con el ID: ' + uid
            });
        }

        const { password, google, email, ...campos } = req.body;

        if (usuarioDb.email !== email) {
            // TODO: verificación
            const existeEmail = await User.findOne({ email });

            if (existeEmail) {
                return res.status(400).json({
                    success: true,
                    message: 'Ya existe un usuario con ese email: ' + req.body.email
                });
            }
        }

        campos.email = email;
        const usuarioActualizado = await User.findByIdAndUpdate(uid, campos, { new: true });
        
        res.status(201).json({
            success: true,
            user: usuarioActualizado
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Error inesperado.'
        });
    }
};

/**
 * Delete one User by 2 types: l = logic,  p = physical
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const deleteUser = async (req, res = response) => {
    const uid = req.params.id;
    const typeDeleted = (req.params.typeDeleted ? (req.params.typeDeleted == 'p' ? 'PHYSICAL' : 'LOGIC') : 'LOGIC');
    let usuarioEliminado = '';

    try {
        const usuarioDb = await User.findById(uid);

        if (!usuarioDb) {
            return res.status(404).json({
                success: false,
                message: 'No existe el usuario en la base de datos con el ID: ' + uid
            });
        }        

        if (typeDeleted == 'PHYSICAL') {
            await User.findByIdAndDelete( uid );
        } else if (typeDeleted == 'LOGIC') {
            let status_deleted = 'I';
            usuarioEliminado = await User.findByIdAndUpdate(
                uid, 
                {
                    status_deleted: 'I'
                }
            );
        }
                
        res.status(200).json({
            success: true,
            message: 'user deleted with id: ' + uid            
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Error inesperado.'
        });        
    }
};

module.exports = {
    getUsers,
    setUser,
    updateUser,
    deleteUser
}