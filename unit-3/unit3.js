var express = require("express");
var path = require("path");
var unit3 = express.Router();

unit3.use(express.static(path.join(__dirname, "investo-website")));

module.exports = unit3;
