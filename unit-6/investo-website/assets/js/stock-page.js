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
let stockSymbol;
let businessName;
let myPosition;
let quantityEl;
let priceEl;
let myPositionQuantity;
let watchlistButton;
let buySellTotal;
let investorLink;

// declare the values that will be added to the table and
// get the elements those values will be injected into
let priceDates;
let tableDates;
let openingPrices;
let tableOpenings;
let closingPrices;
let tableClosings;
let priceChanges;
let tableChanges;
let stockInfo;
let marketData;

// function to load and inject all data required for individual stock page
async function loadStockPage() {
  stockSymbol = $("#symbol");
  businessName = $("#business-name");
  myPosition = $("#my-position");
  quantityEl = $("#quantity");
  priceEl = $("#price");
  myPositionQuantity = $("#position-quantity");
  watchlistButton = $("#watch-list-button");
  buySellTotal = $("#buy-sell-total");
  investorLink = $("#investor-link");

  tableDates = $("#table-dates");
  tableOpenings = $("#table-openings");
  tableClosings = $("#table-closings");
  tableChanges = $("#table-changes");

  await $.getJSON(
    "/unit-6/investo-website/data/stock-info-data.json",
    (res) => {
      // store local copy of stock info data
      stockInfo = res.stockInfoData;
    }
  );

  await $.getJSON("/unit-6/investo-website/data/stock-data.json", (res) => {
    // store local copy of stock data
    marketData = res.stockData;
  });

  // try to get portfolio from session storage
  portfolio = getPortfolio();

  // get stock symbol from url
  stock = window.location.pathname.split("/").splice(-1)[0].split(".")[0];

  // find stock in stock data array
  thisStock = marketData.find(
    (stk) => stk.symbol.toLowerCase() === stock.toLowerCase()
  );

  // set the investor page link
  investorLink.attr(
    "href",
    stockInfo.find((stk) => stk.symbol == thisStock.symbol).investorWebsite
  );

  buySellTotal.text("$0");
  document.title = `Investo: ${thisStock.symbol}`;
  quantityEl.text(quantity);
  stockSymbol.text(thisStock.symbol);
  businessName.text(thisStock.company);

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
    let cell = $("<td></td>");
    let dateArray = date.split(" ")[0].split("-");
    let year = dateArray[0];
    let month = Number(dateArray[1]);
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
    cell.text(months[month - 1] + " " + day + ", " + year);
    tableDates.append(cell);
  });

  // add opening price table cells
  openingPrices.forEach((price) => {
    let cell = $("<td></td>");
    cell.text(`$${Number(price).toFixed(2)}`);
    tableOpenings.append(cell);
  });

  // add closing price table cells
  closingPrices.forEach((price) => {
    let cell = $("<td></td>");
    cell.text(`$${Number(price).toFixed(2)}`);
    tableClosings.append(cell);
  });

  // add price change table cells
  changes.forEach((change) => {
    let cell = $("<td></td>");
    cell.text(`${change}%`);
    tableChanges.append(cell);
  });

  // add stock price to price element
  priceEl.textContent = `$${Number(price).toFixed(2)}`;

  // if the stock is in the users portfolio update the my position values
  if (getStockFromPortfolio(stock)) {
    // find the stock in the portfolio
    let stk = portfolio.find((stk) => stk.symbol == thisStock.symbol).quantity;
    // update the HTML
    myPosition.text(`$${(stk * price).toFixed(2)}`);
    myPositionQuantity.text(stk);
  } else {
    // if it's not in the portfolio the position is 0
    myPosition.text(`$${0}`);
    myPositionQuantity.text(0);
  }

  const keys = Object.keys(thisStock.prices).reverse();
  const openValues = [];
  keys.forEach((date) => {
    openValues.push(thisStock.prices[date]["1. open"]);
  });
  let gradient;
  let color;
  if (openValues[0] < openValues[openValues.length - 1]) {
    gradient = "rgba(204, 255, 204";
    color = "rgba(0,153,0)";
  } else {
    gradient = "rgba(255, 204, 204";
    color = "rgba(179,0,0)";
  }
  var canvas = document.getElementById("stock-chart");
  var ctx = canvas.getContext("2d");
  $("#price").html(`$${Number(openValues[0]).toFixed(2)}`);
  buildChart(openValues, keys, ctx, gradient, color);
}

// function to increase the buy/sell quantity and display the updated quantity
function increase() {
  quantity >= 0 ? (quantity += 1) : (quantity = 0);
  quantityEl.text(quantity);
  buySellTotal.text(`$${(quantity * price).toFixed(2)}`);
}

// function to decrease the buy/sell quantity and display the updated quantity
function decrease() {
  quantity > 0 ? (quantity -= 1) : (quantity = 0);
  quantityEl.text(quantity);
  buySellTotal.text(`$${(quantity * price).toFixed(2)}`);
}

// function to buy a quantity of stock when the user presses buy
async function buy() {
  // call portfolio buy stock function
  await buyStock(stock, quantity);

  // if successful update HTML
  myPosition.text(
    `$${(getStockFromPortfolio(stock).quantity * price).toFixed(2)}`
  );
  myPositionQuantity.text(getStockFromPortfolio(stock).quantity);

  // update the quantity to buy/sell back to 0
  quantity = 0;
  quantityEl.text(quantity);
  buySellTotal.text("$0");
}

// function to sell a quantity of stock when the user presses sell
async function sell() {
  // call portfolio sell stock function
  await sellStock(stock, quantity);

  // if successful get the stock from the portfolio to update the my position elements
  let stk = getStockFromPortfolio(stock);
  if (stk) {
    myPosition.text(`$${(stk.quantity * price).toFixed(2)}`);
    myPositionQuantity.text(stk.quantity);
  } else {
    myPositionQuantity.text(0);
    myPosition.text("$0");
  }

  // update the quantity to buy/sell back to 0
  quantity = 0;
  quantityEl.text(quantity);
  buySellTotal.text("$0");
}

// function to set the HTML content of the watchlist button depending on if the stock is
// already in the watchlist or not
const setWatchlistButtonContent = () => {
  if (stockInWatchlist(stock)) {
    watchlistButton.text("Remove from Watchlist");
    watchlistButton.attr(
      "onclick",
      "removeFromWatchlist(stock); setWatchlistButtonContent()"
    );
  } else {
    watchlistButton.text("Add to Watchlist");
    watchlistButton.attr(
      "onclick",
      "addToWatchlist(stock); setWatchlistButtonContent()"
    );
  }
};

$(() => {
  loadStockPage();
  // set the watchlist button HtML and load the stock page data on page load
  setWatchlistButtonContent();
});
