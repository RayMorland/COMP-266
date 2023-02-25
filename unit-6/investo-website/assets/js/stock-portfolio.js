/*
 * title: stock-portfolio.js
 * description: functions for managing user's stock portfolio
 * date: February 24, 2023
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
async function getStock(symbol) {
  let stock;
  await $.getJSON("/unit-6/investo-website/data/stock-data.json").done((data) => {
    // find stock in stock data
    stock = data.stockData.find((stock) => stock.symbol === symbol);
  });
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
      // increase the quantity of the stock in the portfolio
      portfolio.forEach((item) =>
        item.symbol === symbol ? (item.quantity += quantity) : null
      );
    } else {
      // if the stock is not in the portfolio add it with a quantity
      stock = await getStock(symbol);
      stock["quantity"] = quantity;
      portfolio.push(stock);
    }

    // update the portfolio in session storage
    sessionStorage.setItem("portfolio", JSON.stringify(portfolio));
  } else {
    alert("Enter quantity greater than 0");
  }
}

// function to sell stock given the stock symbol and the quantity to sell
function sellStock(symbol, quantity) {
  // get the stock from the portfolio
  let stock = getStockFromPortfolio(symbol);
  // get the portfolio
  let portfolio = getPortfolio();
  // get the index of the stock
  let indexOfStock = portfolio.findIndex((stk) => stk.symbol == symbol);

  // if the stock is in the portfolio
  if (stock) {
    if (quantity <= 0) {
      alert("Must be more than 0");
    } else if (quantity > stock.quantity) {
      alert("You don't have that many");
    } else if (quantity == stock.quantity) {
      // if the quantity to sell is equal to the quantity in the portfolio
      // remove the stock from the portfolio
      portfolio.splice(indexOfStock, 1);
    } else {
      // if the quantity to sell is less than the quantity in the portfolio
      // decrease the quantity in the portfolio
      portfolio[indexOfStock].quantity -= quantity;
    }

    // update the portfolio
    sessionStorage.setItem("portfolio", JSON.stringify(portfolio));
  } else {
    alert("You don't own this stock");
  }
}

// function to get the watchlist from session storage
function getWatchlist() {
  // try to get the watchlist from session storage
  let watchlist = JSON.parse(sessionStorage.getItem("watchlist"));

  if (watchlist) {
    // if it exists return it
    return watchlist;
  } else {
    // if it doesn't exists create a new empty watchlist and save it in session storage
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

  // if a symbol is not in the watch list add it and save the watchlist
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

  // if a symbol is in the watch list remove it and save the watchlist
  if (watchlist.indexOf(symbol) < 0 - 1) {
    alert("symbol not in watchlist");
  } else {
    watchlist.splice(watchlist.indexOf(symbol), 1);
    sessionStorage.setItem("watchlist", JSON.stringify(watchlist));
  }
}
