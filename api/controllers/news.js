const axios = require("axios");

module.exports.get = async (req, res) => {
  await axios
    .get(
      `https://stocknewsapi.com/api/v1?tickers=${req.query.symbol}&items=3&page=1&token=${process.env.STOCK_NEWS_API_KEY}`
    )
    .then((data) => {
      let articles = { articles: data.data.data.slice(0, 3) };
      res.send(articles);
    });
};
