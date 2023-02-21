/*
 * title: stock-page.js
 * description: functions required for the individual stock pages
 * date: February 19, 2023
 * @author Raymond Morland
 * @version 1.0
 * @copyright 2023 Raymond Morland
 */

// declare the stock 
let thisStock;
// declare portfolio
let portfolio;
// declare stock symbol
let stock;
// declare stock price
let price;
// declare quantity of stock to buy/sell
let quantity = 0;

//get page elements that will have data injected into them
let stockSymbol = document.getElementById("symbol");
let businessName = document.getElementById("business-name");
let myPosition = document.getElementById("my-position");
let quantityEl = document.getElementById("quantity");
let priceEl = document.getElementById("price");
let myPositionQuantity = document.getElementById("position-quantity");
let watchlistButton = document.getElementById("watch-list-button");
let buySellTotal = document.getElementById("buy-sell-total");
let investorLink = document.getElementById("investor-link");

// declare the values that will be added to the table and
// get the elements those values will be injected into
let priceDates;
let tableDates = document.getElementById("table-dates");
let openingPrices;
let tableOpenings = document.getElementById("table-openings");
let closingPrices;
let tableClosings = document.getElementById("table-closings");
let priceChanges;
let tableChanges = document.getElementById("table-changes");

// store local copy of stock info data array
let stockInfo = stockInfoData;
// store local copy of stock data array
let marketData = stockData;

// function to load and inject all data required for individual stock page
function loadStockPage() {
  // try to get portfolio from session storage
  portfolio = getPortfolio();

  // get stock symbol from url
  stock = window.location.pathname.split("/").splice(-1)[0].split(".")[0];

  // find stock in stock data array
  thisStock = marketData.find(
    (stk) => stk.symbol.toLowerCase() === stock.toLowerCase()
  );

  // set the investor page link
  investorLink.setAttribute(
    "href",
    stockInfo.find((stk) => stk.symbol == thisStock.symbol).investorWebsite
  );

  buySellTotal.textContent = "$0";
  document.title = `Investo: ${thisStock.symbol}`;
  quantityEl.textContent = quantity;
  stockSymbol.textContent = thisStock.symbol;
  businessName.textContent = thisStock.company;

  // get the current price of the stock
  price = thisStock.prices[Object.keys(thisStock.prices)[99]]["4. close"];

  // get the last five time time periods for the stock to display in the table
  priceDates = Object.keys(thisStock.prices).slice(-6, -1);
  
  // get the opening prices for those time periods
  openingPrices = priceDates.map((date) => {
    return thisStock.prices[date]["1. open"];
  });

  // get the closing prices for those time periods
  closingPrices = priceDates.map((date) => {
    return thisStock.prices[date]["4. close"];
  });

  // get the price changes for those time periods
  changes = openingPrices.map((price, index) => {
    return (closingPrices[index] - price).toFixed(2);
  });

  // for each date convert the date format from YYYY-MM-DD to Month Day, Year and
  // add table cell for date
  priceDates.forEach((date) => {
    let cell = document.createElement("td");
    let dateArray = date.split(" ")[0].split("-");
    let year = dateArray[0];
    let month = Number(dateArray[1]);
    console.log(dateArray);
    let day = dateArray[2][0] == "0" ? dateArray[2][1] : dateArray[2];
    let months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ];
    cell.textContent = months[month - 1] + " " + day + ", " + year;
    tableDates.appendChild(cell);
  });

  // add opening price table cells
  openingPrices.forEach((price) => {
    let cell = document.createElement("td");
    cell.textContent = `$${Number(price).toFixed(2)}`;
    tableOpenings.appendChild(cell);
  });

  // add closing price table cells
  closingPrices.forEach((price) => {
    let cell = document.createElement("td");
    cell.textContent = `$${Number(price).toFixed(2)}`;
    tableClosings.appendChild(cell);
  });

  // add price change table cells
  changes.forEach((change) => {
    let cell = document.createElement("td");
    cell.textContent = `${change}%`;
    tableChanges.appendChild(cell);
  });

  // add stock price to price element
  priceEl.textContent = `$${Number(price).toFixed(2)}`;

  // if the stock is in the users portfolio update the my position values
  if (getStockFromPortfolio(stock)) {
    // find the stock in the portfolio
    let stk = portfolio.find((stk) => stk.symbol == thisStock.symbol).quantity;
    // update the HTML
    myPosition.textContent = `$${(stk * price).toFixed(2)}`;
    myPositionQuantity.textContent = stk;
  } else {
    // if it's not in the portfolio the position is 0
    myPosition.textContent = `$${0}`;
    myPositionQuantity.textContent = 0;
  }
}

// function to increase the buy/sell quantity and display the updated quantity
function increase() {
  quantity >= 0 ? (quantity += 1) : (quantity = 0);
  quantityEl.textContent = quantity;
  buySellTotal.textContent = `$${(quantity * price).toFixed(2)}`;
}

// function to decrease the buy/sell quantity and display the updated quantity
function decrease() {
  quantity > 0 ? (quantity -= 1) : (quantity = 0);
  quantityEl.textContent = quantity;
  buySellTotal.textContent = `$${(quantity * price).toFixed(2)}`;
}

// function to buy a quantity of stock when the user presses buy
function buy() {
  // call portfolio buy stock function
  buyStock(stock, quantity);

  // if successful update HTML
  myPosition.textContent = `$${(
    getStockFromPortfolio(stock).quantity * price
  ).toFixed(2)}`;
  myPositionQuantity.textContent = getStockFromPortfolio(stock).quantity;

  // update the quantity to buy/sell back to 0
  quantity = 0;
  quantityEl.textContent = quantity;
  buySellTotal.textContent = "$0";
}

// function to sell a quantity of stock when the user presses sell
function sell() {
  // call portfolio sell stock function
  sellStock(stock, quantity);

  // if successful get the stock from the portfolio to update the my position elements
  let stk = getStockFromPortfolio(stock);
  if (stk) {
    myPosition.textContent = `$${(stk.quantity * price).toFixed(2)}`;
    myPositionQuantity.textContent = stk.quantity;
  } else {
    myPositionQuantity.textContent = 0;
    myPosition.textContent = "$0";
  }

  // update the quantity to buy/sell back to 0
  quantity = 0;
  quantityEl.textContent = quantity;
  buySellTotal.textContent = "$0";
}

// function to set the HTML content of the watchlist button depending on if the stock is
// already in the watchlist or not
const setWatchlistButtonContent = () => {
  if (stockInWatchlist(stock)) {
    watchlistButton.textContent = "Remove from Watchlist";
    watchlistButton.setAttribute(
      "onclick",
      "removeFromWatchlist(stock); setWatchlistButtonContent()"
    );
  } else {
    watchlistButton.textContent = "Add to Watchlist";
    watchlistButton.setAttribute(
      "onclick",
      "addToWatchlist(stock); setWatchlistButtonContent()"
    );
  }
};

// set the watchlist button HtML and load the stock page data on page load
setWatchlistButtonContent();
loadStockPage();
