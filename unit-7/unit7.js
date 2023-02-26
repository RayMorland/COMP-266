var express = require("express");
const axios = require("axios");
var path = require("path");
var unit7 = express.Router();
var stockSymbols = require("../url-lists/stock-symbols");
var articleList = require("../url-lists/article-list");
const { nextTick } = require("process");

unit7.use(
  "/assets/",
  express.static(path.join(__dirname, "/investo-website/assets"))
);

unit7.use(express.static(path.join(__dirname, "/investo-website")));

unit7.get("/index.html", (req, res) => {
  res.redirect(__dirname + "/investo-website/index.html");
});

unit7.get("/", (req, res) => {
  res.sendFile(__dirname + "/investo-website/index.html");
});

unit7.get("/learn.html", (req, res) => {
  res.sendFile(__dirname + "/investo-website/learn.html");
});

unit7.get("/learn/article", (req, res) => {
  res.redirect("/unit-4/investo-website/learn.html");
});

unit7.get("/learn/article/*", (req, res, next) => {
  let slug = req.url.split("/")[3];

  if (articleList.indexOf(slug) >= 0) {
    res.sendFile(__dirname + `/investo-website/articles/${slug}.html`);
  } else {
    next();
  }
});

unit7.get("/invest.html", (req, res) => {
  res.sendFile(__dirname + "/investo-website/invest.html");
});

unit7.get("/invest/portfolio.html", (req, res) => {
  res.sendFile(__dirname + "/investo-website/invest/portfolio.html");
});

unit7.get("/invest/stock", (req, res) => {
  res.redirect(__dirname + "/investo-website/invest.html");
});

unit7.get("/invest/stock/*", (req, res, next) => {
  let symbol = req.url.split("/")[3];

  if (stockSymbols.indexOf(symbol) >= 0) {
    res.sendFile(__dirname + `/investo-website/invest/stock/${symbol}.html`);
  } else {
    next();
  }
});

unit7.get("/about.html", (req, res) => {
  res.sendFile(__dirname + "/investo-website/about.html");
});

module.exports = unit7;
