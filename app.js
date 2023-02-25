const express = require('express');
const cors = require("cors");
require('dotenv').config();
const app = express();
const port = process.env.PORT || 8081;

const stocksApi = require('./api/routes/stock-routes');
const articlesApi = require('./api/routes/article-routes');

app.use(cors());

app.use(function (req, res, next) {
  if (process.env.NODE_ENV === 'production') {
    if ((!req.secure) && (req.get('X-Forwarded-Proto') !== 'https')) {
      res.redirect('https://' + req.get('Host') + req.url);
    } else {
      next();
    }
  } else {
    next();
  }
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get('/index.html', (req, res) => {
  res.sendFile(__dirname + "/index.html");
})

// app.use('/unit-1/investo-website', require('./unit-1/unit1'));
app.use('/unit-2/investo-website', require('./unit-2/unit2'));
app.use('/unit-3/investo-website', require('./unit-3/unit3'));
app.use('/unit-4/investo-website', require('./unit-4/unit4'));
app.use('/unit-5/investo-website', require('./unit-5/unit5'));
app.use('/unit-6/investo-website', require('./unit-6/unit6'));
app.use('/unit-7/investo-website', require('./unit-7/unit7'));

app.use('/api/stocks', stocksApi);
app.use('/api/articles', articlesApi);

app.get('*', (req, res) => {
  res.sendFile(__dirname + "/404.html");
})
  
app.listen(port, () => {
  console.log(`COMP 266 Portfolio app listening on port ${port}`)
})