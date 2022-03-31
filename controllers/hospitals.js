const { response } = require('express');
const Hospital = require('../models/hospital');
const bcrypt = require('bcryptjs');
const { jwtGenerate } = require('../helpers/jwt');

/**
 * Get all hospitals
 * 
 * @param {*} req 
 * @param {*} res 
 */
const getHospitals = async (req, res = response) => {
    const hospitals = await Hospital.find()
                                    .populate('user', 'name email image')
    res.json({
        success: true,
        hospitals
    });
}

/**
 * Save User by POST method
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const setHospital = async (req, res = response) => {

    const uid = req.uid;
    const hospital = new Hospital({
        user: uid,
        ... req.body
    });

    try {
        const hospitalDb = await hospital.save();
        
        await res.json({
            success: true,
            hospital
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
const updateHospital = async (req, res = response) => {

    // TODO: validar token

    const uid = req.params.id;    

    // flujo UPDATE
    try {
        // const usuarioDb = await User.findById(uid);

        // if (!usuarioDb) {
        //     return res.status(404).json({
        //         success: false,
        //         message: 'No existe el usuario en la base de datos con el ID: ' + uid
        //     });
        // }

        const { password, google, email, ...campos } = req.body;

        // if (usuarioDb.email !== email) {
        //     // TODO: verificación
        //     const existeEmail = await User.findOne({ email });

        //     if (existeEmail) {
        //         return res.status(400).json({
        //             success: true,
        //             message: 'Ya existe un usuario con ese email: ' + req.body.email
        //         });
        //     }
        // }

        // campos.email = email;
        // const usuarioActualizado = await User.findByIdAndUpdate(uid, campos, { new: true });
        
        res.status(201).json({
            success: true,
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
const deleteHospital = async (req, res = response) => {
    const uid = req.params.id;
    const typeDeleted = (req.params.typeDeleted ? (req.params.typeDeleted == 'p' ? 'PHYSICAL' : 'LOGIC') : 'LOGIC');

    try {
        //const usuarioDb = await User.findById(uid);

        // if (!usuarioDb) {
        //     return res.status(404).json({
        //         success: false,
        //         message: 'No existe el usuario en la base de datos con el ID: ' + uid
        //     });
        // }        

        // if (typeDeleted == 'PHYSICAL') {
        //     await User.findByIdAndDelete( uid );
        // } else if (typeDeleted == 'LOGIC') {
        //     let status_deleted = 'I';
        //     usuarioEliminado = await User.findByIdAndUpdate(
        //         uid, 
        //         {
        //             status_deleted: 'I'
        //         }
        //     );
        // }
                
        res.status(200).json({
            success: true,
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
    getHospitals,
    setHospital,
    updateHospital,
    deleteHospital
}