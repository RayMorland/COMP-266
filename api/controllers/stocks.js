const stocks = require('../data/stock-data.json');

module.exports.getAll = (req, res) => {
    res.send(stocks);
};

module.exports.get = (req, res) => {
    let symbol = req.query.symbol;
    let stock = stocks.stockData.find(stk => stk.symbol === symbol);
    res.send(stock);
};