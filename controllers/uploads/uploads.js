const { response } = require('express');
const { v4: uuidv4 } = require('uuid');
const { uploadImage } = require('../../helpers/uploads/upload-image');
const pathNode = require('path');
const fs = require('fs');

// Models
// const User = require('../../models/user');
// const Doctor = require('../../models/doctor');
// const Hospital = require('../../models/hospital');

/**
 * Upload File
 * 
 * @param {*} req 
 * @param {*} res 
 */
const fileUpload = async (req, res = response) => {
    const collection = req.params.collection;
    const id = req.params.id;
    // Validate Type
    const validTypes = ['hospitals', 'doctors', 'users'];

    if ( !validTypes.includes(collection) ) {
        return res.status(400).json({
            success: false,
            message: 'No es un médico/doctor, hospital o usuario.'
        });
    }

    // validate file exist
    if ( !req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            success: false,
            message: 'No se encontró ningún archivo a subir a la plataforma.'
        });
    }

    // Process Image
    const file = req.files.image;
    const cutName = file.name.split('.'); // name.1.2.3.jpg
    const extensionFile = cutName[cutName.length - 1];

    // validate Extension
    const validExtensions = ['png', 'jpg', 'jpeg', 'gif'];

    if ( !validExtensions.includes( extensionFile )) {
        return res.status(400).json({
            success: false,
            message: 'No es una extensión permitida'
        });
    }

    // Generate name File
    const fileName = `${ uuidv4() }.${ extensionFile }`;
    const path = `./uploads/${collection}/${fileName}`;

    // Move to File(image)
    file.mv( path, (error) => {
        if (error) {
            return res.status(500).json({
                success: false,
                message: 'Error al mover la imágen en el directorio: ' + collection
            });
        }

        // Guardar registros asociados a la imagen
        uploadImage( 
            collection, 
            id,
            fileName,
            path
        );

        res.status(200).json({
            success: true,
            message: 'archivo subido correctamente.',
            fileName
        });
    });
}

const fileUploadMulter = async (req, res = response) => {
    await console.log('test')
    res.json({
        success: true,
        test: 817
    });
}

const getImage = async (req, res) => {
    const collection = req.params.collection;
    const photoId = req.params.photo;
    const pathImg = pathNode.join( __dirname, `../../uploads/${collection}/${photoId}`);

    try {
        if ( fs.existsSync(pathImg)) {
            await res.sendFile( pathImg );
        } else {
            const pathImgDefault = pathNode.join( __dirname, `../../uploads/app/default.png`);
            await res.sendFile( pathImgDefault );
        }
    } catch (error) {
        console.log('error: ', error);
        return res.status(500).json({
            success: false,
            message: 'Error al intentar procesar una imágen',
            error
        });        
    }    
}

module.exports = {
    fileUpload,
    fileUploadMulter,
    getImage
};