const User = require('../../models/user');
const Doctor = require('../../models/doctor');
const Hospital = require('../../models/hospital');
const fs = require('fs');

const deleteImage = (path) => {
    if (fs.existsSync(path)) {
        // delete image file
        fs.unlinkSync(path);
    }
}

const uploadImage = async (
    collection,
    id,
    fileName,
    path
) => {
    switch (collection) {
        case 'doctors':
            const doctor = await Doctor.findById(id);

            if (!doctor) {
                console.log('no es doctor por id')
                return false;
            }

            // verificar imagen previamente subida para borrar
            const oldPath = `./uploads/doctors/${ doctor.image }`;
            deleteImage(oldPath);


            doctor.image = fileName;
            await doctor.save();
            return true;
        break;

        case 'hospitals':
            const hospital = await Hospital.findById(id);

            if (!hospital) {
                console.log('no es hospital por id')
                return false;
            }

            // verificar imagen previamente subida para borrar
            const oldPath2 = `./uploads/hospitals/${ hospital.image }`;
            deleteImage(oldPath2);


            hospital.image = fileName;
            await hospital.save();
            return true;
        break;

        case 'users':
            const user = await User.findById(id);

            if (!user) {
                console.log('no es user por id')
                return false;
            }

            // verificar imagen previamente subida para borrar
            const oldPath3 = `./uploads/users/${ user.image }`;
            deleteImage(oldPath3);

            user.image = fileName;
            await user.save();
            return true;
        break;         
    
        default:
            break;
    }
}

module.exports = {
    uploadImage
};