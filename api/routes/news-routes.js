var express = require('express');
var router = express.Router();
var ctrlNews = require('../controllers/news');


router.get('/symbol', ctrlNews.get);

module.exports = router;