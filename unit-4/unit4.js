var express = require("express");
var path = require("path");
var unit4 = express.Router();

unit4.use(
  "/assets/",
  express.static(path.join(__dirname, "/investo-website/assets"))
);

// unit4.use(
//     express.static(path.join(__dirname, "/investo-website"))
//   );

unit4.get("/index.html", (req, res) => {
  res.redirect(__dirname + "/investo-website/index.html");
});

unit4.get("/", (req, res) => {
  res.sendFile(__dirname + "/investo-website/index.html");
});

unit4.get("/learn", (req, res) => {
  res.sendFile(__dirname + "/investo-website/learn.html");
});

unit4.get("/learn/article", (req, res) => {
  res.sendFile(__dirname + "/investo-website/article.html");
});

unit4.get("/invest", (req, res) => {
  res.sendFile(__dirname + "/investo-website/invest.html");
});

unit4.get("/invest/portfolio", (req, res) => {
  res.sendFile(__dirname + "/investo-website/portfolio.html");
});

unit4.get("/invest/stock", (req, res) => {
  res.sendFile(__dirname + "/investo-website/stock.html");
});

unit4.get("/about", (req, res) => {
  res.sendFile(__dirname + "/investo-website/about.html");
});

module.exports = unit4;
