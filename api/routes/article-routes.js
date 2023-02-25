var express = require('express');
var router = express.Router();
var ctrlArticles = require('../controllers/articles');


router.get('/', ctrlArticles.getAll);
router.get('/article', ctrlArticles.get);

module.exports = router;