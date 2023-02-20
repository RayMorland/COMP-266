/*
 * title: stock-page.js
 * description: functions required for the individual stock pages
 * date: February 19, 2023
 * @author Raymond Morland
 * @version 1.0
 * @copyright 2023 Raymond Morland
 */

let thisStock;
let portfolio;
let stock;
let price;
let quantity = 0;
let stockSymbol = document.getElementById("symbol");
let businessName = document.getElementById("business-name");
let myPosition = document.getElementById("my-position");
let quantityEl = document.getElementById("quantity");
let priceEl = document.getElementById("price");
let myPositionQuantity = document.getElementById("position-quantity");
let watchlistButton = document.getElementById("watch-list-button");
//
let priceDates;
let tableDates = document.getElementById("table-dates");
let openingPrices;
let tableOpenings = document.getElementById("table-openings");
let closingPrices;
let tableClosings = document.getElementById("table-closings");
let priceChanges;
let tableChanges = document.getElementById("table-changes");
let buySellTotal = document.getElementById("buy-sell-total");
let investorLink = document.getElementById("investor-link");
let stockInfo = stockInfoData;

// function to load and inject all data required for individual stock page
function loadStockPage() {
  marketData = stockData;
  portfolio = getPortfolio();

  stock = window.location.pathname.split("/").splice(-1)[0].split(".")[0];

  thisStock = marketData.find(
    (stk) => stk.symbol.toLowerCase() === stock.toLowerCase()
  );

  investorLink.setAttribute(
    "href",
    stockInfo.find((stk) => stk.symbol == thisStock.symbol).investorWebsite
  );
  buySellTotal.textContent = "$0";
  document.title = `Investo: ${thisStock.symbol}`;

  quantityEl.textContent = quantity;

  stockSymbol.textContent = thisStock.symbol;
  businessName.textContent = thisStock.company;

  price = thisStock.prices[Object.keys(thisStock.prices)[99]]["4. close"];

  priceDates = Object.keys(thisStock.prices).slice(-6, -1);

  openingPrices = priceDates.map((date) => {
    return thisStock.prices[date]["1. open"];
  });

  closingPrices = priceDates.map((date) => {
    return thisStock.prices[date]["4. close"];
  });

  changes = openingPrices.map((price, index) => {
    return (closingPrices[index] - price).toFixed(2);
  });

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

  openingPrices.forEach((price) => {
    let cell = document.createElement("td");
    cell.textContent = `$${Number(price).toFixed(2)}`;
    tableOpenings.appendChild(cell);
  });

  closingPrices.forEach((price) => {
    let cell = document.createElement("td");
    cell.textContent = `$${Number(price).toFixed(2)}`;
    tableClosings.appendChild(cell);
  });

  changes.forEach((change) => {
    let cell = document.createElement("td");
    cell.textContent = `${change}%`;
    tableChanges.appendChild(cell);
  });

  priceEl.textContent = `$${Number(price).toFixed(2)}`;

  if (getStockFromPortfolio(stock)) {
    let stk = portfolio.find((stk) => stk.symbol == thisStock.symbol).quantity;
    myPosition.textContent = `$${(stk * price).toFixed(2)}`;
    myPositionQuantity.textContent = stk;
  } else {
    myPosition.textContent = `$${0}`;
  }
}

function increase() {
  quantity >= 0 ? (quantity += 1) : (quantity = 0);
  quantityEl.textContent = quantity;
  buySellTotal.textContent = `$${(quantity * price).toFixed(2)}`;
}

function decrease() {
  quantity > 0 ? (quantity -= 1) : (quantity = 0);
  quantityEl.textContent = quantity;
  buySellTotal.textContent = `$${(quantity * price).toFixed(2)}`;
}

async function buy() {
  await buyStock(stock, quantity);

  myPosition.textContent = `$${(
    getStockFromPortfolio(stock).quantity * price
  ).toFixed(2)}`;
  myPositionQuantity.textContent = getStockFromPortfolio(stock).quantity;
  quantity = 0;
  quantityEl.textContent = quantity;
  buySellTotal.textContent = "$0";
}

async function sell() {
  await sellStock(stock, quantity);
  console.log(stock);

  let stk = getStockFromPortfolio(stock);

  if (stk) {
    myPosition.textContent = `$${(stk.quantity * price).toFixed(2)}`;
    myPositionQuantity.textContent = stk.quantity;
  } else {
    myPositionQuantity.textContent = 0;
    myPosition.textContent = "$0";
  }

  quantity = 0;
  quantityEl.textContent = quantity;
  buySellTotal.textContent = "$0";
}

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

setWatchlistButtonContent();
loadStockPage();
