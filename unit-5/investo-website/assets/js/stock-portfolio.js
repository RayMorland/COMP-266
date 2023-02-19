portfolio = getPortfolio();

function getPortfolio() {
  const portfolio = JSON.parse(sessionStorage.getItem("portfolio"));
  if (portfolio) {
    return portfolio;
  } else {
    console.log("Portfolio does not exist. Creating new portfolio...");
    sessionStorage.setItem("portfolio", JSON.stringify([]));
    return JSON.parse(sessionStorage.getItem("portfolio"));
  }
}

function getStockFromPortfolio(symbol) {
  const portfolio = getPortfolio();
  const stock = portfolio.find((item) => item.symbol === symbol);
  return stock;
}

function resetPortfolio() {
  sessionStorage.setItem("portfolio", JSON.stringify([]));
}

async function getStock(symbol) {
  let stock;
  stock = stockData.find((stock) => stock.symbol === symbol);
  return stock;
}

async function buyStock(symbol, quantity) {
  let stock = getStockFromPortfolio(symbol);
  let portfolio = getPortfolio();

  console.log(portfolio);

  if (quantity > 0) {
    if (stock) {
      portfolio.forEach((item) =>
        item.symbol === symbol ? (item.quantity += quantity) : null
      );
    } else {
      stock = await getStock(symbol);
      stock["quantity"] = quantity;
      console.log(stock);
      portfolio.push(stock);
    }
    sessionStorage.setItem("portfolio", JSON.stringify(portfolio));
  } else {
    alert("Enter quantity greater than 0");
  }
}

async function sellStock(symbol, quantity) {
  console.log(symbol, quantity);
  let stock = getStockFromPortfolio(symbol);
  let portfolio = getPortfolio();
  let indexOfStock = portfolio.findIndex(stk =>  stk.symbol == symbol);

  if (stock) {
    if (quantity < 0) {
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

function stockInWatchlist(symbol) {
  return getWatchlist().indexOf(symbol) > -1 ? true : false;
}

function addToWatchlist(symbol) {
  console.log(symbol);
  let watchlist = getWatchlist();

  console.log(watchlist.indexOf(symbol));

  if (watchlist.indexOf(symbol) > -1) {
    alert("symbol already in watchlist");
  } else {
    watchlist.push(symbol);
    sessionStorage.setItem("watchlist", JSON.stringify(watchlist));
  }
}

function removeFromWatchlist(symbol) {
  let watchlist = getWatchlist();
  console.log(watchlist.indexOf(symbol) > -1);

  if (watchlist.indexOf(symbol) < 0 - 1) {
    alert("symbol not in watchlist");
  } else {
    watchlist.splice(watchlist.indexOf(symbol), 1);
    sessionStorage.setItem("watchlist", JSON.stringify(watchlist));
  }
}
