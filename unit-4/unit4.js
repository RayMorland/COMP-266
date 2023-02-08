var express = require('express');
var path = require('path');
var unit4 = express.Router();

unit4.use('/assets/', express.static(path.join(__dirname, 'investo-website/assets')));

unit4.get("/", (req, res) => {
    console.log(__dirname);
    res.sendFile(__dirname + "/investo-website/index.html");
});

module.exports = unit4;