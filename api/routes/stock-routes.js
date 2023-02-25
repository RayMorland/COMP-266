var express = require('express');
var router = express.Router();
var ctrlStocks = require('../controllers/stocks');

router.get('/', ctrlStocks.getAll);
router.get('/stock', ctrlStocks.get);

module.exports = router;