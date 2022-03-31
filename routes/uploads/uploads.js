/* 
    Path:  api/uploads/:entity
*/

const { Router } = require('express');
const { validateJWT } = require('../../middlewares/validate-jwt');
const expressFileUpload = require('express-fileupload');

const { 
    fileUpload,
    fileUploadMulter,
    getImage
} = require('../../controllers/uploads/uploads.js');

 // Route define
const router = Router();


// call middleware
router.use( expressFileUpload() );

router.put('/single/:collection/:id', validateJWT, fileUpload);
router.get('/single/:collection/:photo', getImage);

//router.post('/multer/:id', upload.single('image'), fileUploadMulter);

module.exports = router;