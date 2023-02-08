var express = require('express');
var path = require('path');
var unit2 = express.Router();

unit2.use('/assets/', express.static(path.join(__dirname, 'investo-website/assets')));

unit2.get("/", (req, res) => {
    console.log(__dirname);
    res.sendFile(__dirname + "/investo-website/index.html");
});

module.exports = unit2;