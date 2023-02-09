var express = require("express");
var path = require("path");
var unit2 = express.Router();

unit2.use(express.static(path.join(__dirname, "investo-website")));

module.exports = unit2;
