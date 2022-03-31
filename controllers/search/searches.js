const { response } = require('express');
// Models
const User = require('../../models/user');
const Doctor = require('../../models/doctor');
const Hospital = require('../../models/hospital');

/**
 * Single manual Search
 * 
 * @param {*} req 
 * @param {*} res 
 */
const getSearches = async (req, res = response) => {

    const params = req.params.param;
    const regex = new RegExp( params, 'i' )

    const [users, doctors, hospitals] = await Promise.all([
        User.find({
            name: regex
        }),

        Doctor.find({
            name: regex
        }),

        Hospital.find({
            name: regex
        })        
    ]);

    res.json({
        success: true,
        users,
        doctors,
        hospitals
    });

};

const getCustomSearches = async (req, res = response) => {
    const collection = req.params.collection;
    const params = req.params.param;
    const regex = new RegExp( params, 'i' );
    let data = [];

    switch (collection) {
        case 'doctors':
            data =  await Doctor.find({
                        name: regex
                    })
                    .populate('user', 'name image')
                    .populate('hospital', 'name image');
            break;

        case 'hospitals':
            data =  await Hospital.find({
                        name: regex
                    })
                    .populate('user', 'name image');                    
            break;

        case 'users':
            data =  await User.find({
                        name: regex
                    });                    
            break;
    
        default:
            return res.status(400).json({
                        success: false,
                        message: 'La colección enviada no corresponde como parámetro permitido en la plataforma'
                    });
    }

    res.status(200).json({
        success: true,
        data
    });
}

module.exports = {
    getSearches,
    getCustomSearches
};