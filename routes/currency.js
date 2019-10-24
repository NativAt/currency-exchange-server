const router = require('express').Router();

const validate = require('../middleware/validate');
const currecnyController = require('../controllers/currency');

router.get('/quote', validate, currecnyController.getQuote);

module.exports = router;
