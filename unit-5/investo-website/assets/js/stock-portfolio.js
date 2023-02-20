/*
 * title: stock-portfolio.js
 * description: functions for managing user's stock portfolio
 * date: February 19, 2023
 * @author Raymond Morland
 * @version 1.0
 * @copyright 2023 Raymond Morland
 */

// get the user's portfolio
portfolio = getPortfolio();

// function to get user's portfolio
function getPortfolio() {
  // get portfolio from session storage and parse it
  const portfolio = JSON.parse(sessionStorage.getItem("portfolio"));
  // if the portfolio exists return it
  if (portfolio) {
    return portfolio;
  } else {
    // if the portfolio does not exist create
    sessionStorage.setItem("portfolio", JSON.stringify([]));
    // parse and return the portfolio
    return JSON.parse(sessionStorage.getItem("portfolio"));
  }
}

// function to find stock in the portfolio given the stock symbol
function getStockFromPortfolio(symbol) {
  // get the portfolio
  const portfolio = getPortfolio();
  // find the stock in the portfolio given the symbol
  const stock = portfolio.find((item) => item.symbol === symbol);
  return stock;
}

// function to reset portfolio and watchlist to empty arrays
function resetPortfolio() {
  sessionStorage.setItem("portfolio", JSON.stringify([]));
  sessionStorage.setItem("watchlist", JSON.stringify([]));
}

// function to get stock from data given stock symbol
function getStock(symbol) {
  let stock;
  // find stock in stock data
  stock = stockData.find((stock) => stock.symbol === symbol);
  return stock;
}

// function to buy stock given symbol and quantity to buy
async function buyStock(symbol, quantity) {
  // try to get stock from portfolio
  let stock = getStockFromPortfolio(symbol);
  // try to get the portfolio
  let portfolio = getPortfolio();

  // if the desired quantity is greater than zero
  if (quantity > 0) {
    // if the stock is in the portfolio already increase the quantity by quantity
    if (stock) {
      //  
      portfolio.forEach((item) =>
        item.symbol === symbol ? (item.quantity += quantity) : null
      );
    } else {
      stock = await getStock(symbol);
      stock["quantity"] = quantity;

      portfolio.push(stock);
    }

    sessionStorage.setItem("portfolio", JSON.stringify(portfolio));
  } else {
    alert("Enter quantity greater than 0");
  }
}

// function to sell stock given the stock symbol and the quantity to sell
async function sellStock(symbol, quantity) {
  let stock = getStockFromPortfolio(symbol);
  let portfolio = getPortfolio();
  let indexOfStock = portfolio.findIndex((stk) => stk.symbol == symbol);

  if (stock) {
    if (quantity <= 0) {
      alert("Must be more than 0");
    } else if (quantity > stock.quantity) {
      alert("You don't have that many");
    } else if (quantity == stock.quantity) {
      portfolio.splice(indexOfStock, 1);
    } else {
      portfolio[indexOfStock].quantity -= quantity;
    }

    sessionStorage.setItem("portfolio", JSON.stringify(portfolio));
  } else {
    alert("You don't own this stock");
  }
}

// function to get the watchlist from session storage
function getWatchlist() {
  let watchlist = JSON.parse(sessionStorage.getItem("watchlist"));

  if (watchlist) {
    return watchlist;
  } else {
    let newWatchlist = [];
    sessionStorage.setItem("watchlist", JSON.stringify(newWatchlist));
    return newWatchlist;
  }
}

// function to get the watchlist and check if symbol is in it
function stockInWatchlist(symbol) {
  return getWatchlist().indexOf(symbol) > -1 ? true : false;
}

// function to add stock symbol to watchlist
function addToWatchlist(symbol) {
  let watchlist = getWatchlist();

  if (watchlist.indexOf(symbol) > -1) {
    alert("symbol already in watchlist");
  } else {
    watchlist.push(symbol);
    sessionStorage.setItem("watchlist", JSON.stringify(watchlist));
  }
}

// function to remove the symbol from the watchlist
function removeFromWatchlist(symbol) {
  let watchlist = getWatchlist();

  if (watchlist.indexOf(symbol) < 0 - 1) {
    alert("symbol not in watchlist");
  } else {
    watchlist.splice(watchlist.indexOf(symbol), 1);
    sessionStorage.setItem("watchlist", JSON.stringify(watchlist));
  }
}
