const jwt = require('jsonwebtoken');

const validateJWT = (req, res, next) => {
    // Leer token
    const token = req.header('x-token');
    
    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'No existe un token asignado en la petición.'
        });
    }

    try {
    
        const { uid } = jwt.verify( token, process.env.JWT_SECRET);
        req.uid = uid;
        next();

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Token no válido.'
        })
    }    
};

module.exports = {
    validateJWT
}