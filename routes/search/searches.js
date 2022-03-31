/* 
    Path:  api/todo/:searches
*/

const { Router } = require('express');
const { validateJWT } = require('../../middlewares/validate-jwt');

const { 
    getSearches,
    getCustomSearches
} = require('../../controllers/search/searches.js');

 // Route define
const router = Router();

router.get('/:param', validateJWT, getSearches);
router.get('/collection/:collection/:param', validateJWT, getCustomSearches);

module.exports = router;