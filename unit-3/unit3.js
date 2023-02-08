var express = require('express');
var path = require('path');
var unit3 = express.Router();

unit3.use('/assets/', express.static(path.join(__dirname, 'investo-website/assets')));

unit3.get("/", (req, res) => {
    console.log(__dirname);
    res.sendFile(__dirname + "/investo-website/index.html");
});

module.exports = unit3;