/*
 * title: stock-page.js
 * description: functions required for the individual stock pages
 * date: February 24, 2023
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
let marketData = [];

// stock symbol news articles
let stockNews;
let stockNewsEl;

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

  stockNewsEl = $("#stock-news");

  // get stock symbol from url
  stock = window.location.pathname.split("/").splice(-1)[0].split(".")[0];

  // get this stock
  thisStock = await getStock(stock);

  // get the news articles for this stock symbol
  stockNews = await getSymbolNews(stock);

  // try to get portfolio from session storage
  portfolio = getPortfolio();

  // set the investor page link
  investorLink.attr("href", thisStock.investorWebsite);

  // set the initial buy sell total
  buySellTotal.text("$0");

  // set the page title to this stock's symbol
  document.title = `Investo: ${thisStock.symbol}`;

  // set quantity element
  quantityEl.text(quantity);

  // set the stock symbol
  stockSymbol.text(thisStock.symbol);

  // set the business name
  businessName.text(thisStock.company);

  // get the current price of the stock
  price = thisStock.prices[Object.keys(thisStock.prices)[0]]["4. close"];

  // get the last five time time periods for the stock to display in the table
  priceDates = Object.keys(thisStock.prices).slice(0, 5);
  6;
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
  priceDates.reverse().forEach((date) => {
    let cell = $("<td></td>");
    let dateArray = date.split(" ")[0].split("-");
    let time = date.split(" ")[1].split(":").slice(0, 2).join(":");
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
    cell.html(
      months[month - 1] + " " + day + ", " + year + "<br>" + time + "<br>"
    );
    tableDates.append(cell);
  });

  // add opening price table cells
  openingPrices.reverse().forEach((price) => {
    let cell = $("<td></td>");
    cell.text(`$${Number(price).toFixed(2)}`);
    tableOpenings.append(cell);
  });

  // add closing price table cells
  closingPrices.reverse().forEach((price) => {
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
  priceEl.text(`$${Number(price).toFixed(2)}`);

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

  // get the keys from the prices, the keys represent the date times of the interval
  const keys = Object.keys(thisStock.prices).reverse();
  const closeValues = [];

  // get the closing price of each interval
  keys.forEach((date) => {
    closeValues.push(thisStock.prices[date]["4. close"]);
  });

  // the price change is the difference between the first opening price and the current price
  let stkChange = (price - closeValues.slice(-20)[0]).toFixed(2);
  let gradient;
  let color;

  // set the gradient and line color depending on the stock price change
  if (stkChange >= 0) {
    gradient = "rgba(204, 255, 204";
    color = "rgba(0,153,0)";
  } else {
    gradient = "rgba(255, 204, 204";
    color = "rgba(179,0,0)";
  }

  // get the canvas element to display the chart in
  var canvas = document.getElementById("stock-chart");
  var ctx = canvas.getContext("2d");

  // build the chart with the last 20 values
  buildChart(closeValues.slice(-20), keys.slice(-20), ctx, gradient, color);

  // inject the stock into the stock news title
  stockNewsEl.append(`<h3>${stock} News</h3>`);

  // for each stock news item add new stock news link
  stockNews.articles.forEach((news) => {
    // create the link element
    let newsLink = $("<a></a>");
    // set the hrek to the news url
    newsLink.attr("href", news.news_url);
    newsLink.attr("class", "news-article-link");
    // inject the html into the link
    newsLink.html(`
      <div class="column m-0 gap-10 news-card">
        <div class="row m-0 news-title">
          ${news.title}
        </div>
        <div class="responsive-row m-0 gap-20">
          <div class="news-source-name">
            ${news.source_name}
          </div>
          <div>
            ${news.topics
              .map(
                (topic) => ` <span class="topic">${topic.toUpperCase()}</span>`
              )
              .join("")}
          </div>
        </div>
      </div>
    `);
    // append the news article link to the stock page
    stockNewsEl.append(newsLink);
  });

  // add the Stock News API link
  stockNewsEl.append(
    `<a href="https://stocknewsapi.com/" class="small-link">Powered by Stock News API</a>`
  );

  // set the watchlist button HtML and load the stock page data on page load
  setWatchlistButtonContent();
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
  let success = await buyStock(stock, quantity);

  if (success) {
    // if successful update HTML
    myPosition.text(
      `$${(getStockFromPortfolio(stock).quantity * price).toFixed(2)}`
    );
    myPositionQuantity.text(getStockFromPortfolio(stock).quantity);

    // alert the user to how many shares they have purchased
    alert(
      `You have purchased ${quantity} share${
        quantity > 1 ? "s" : ""
      } of ${stock}`
    );
    // update the quantity to buy/sell back to 0
    quantity = 0;
    quantityEl.text(quantity);
    buySellTotal.text("$0");
  }
}

// function to sell a quantity of stock when the user presses sell
async function sell() {
  // call portfolio sell stock function
  let success = await sellStock(stock, quantity);

  if (success) {
    // if successful get the stock from the portfolio to update the my position elements
    let stk = getStockFromPortfolio(stock);
    if (stk) {
      myPosition.text(`$${(stk.quantity * price).toFixed(2)}`);
      myPositionQuantity.text(stk.quantity);
    } else {
      myPositionQuantity.text(0);
      myPosition.text("$0");
    }

    // alert the user to how many shares they have sold
    alert(
      `You have sold ${quantity} share${quantity > 1 ? "s" : ""} of ${stock}`
    );

    // update the quantity to buy/sell back to 0
    quantity = 0;
    quantityEl.text(quantity);
    buySellTotal.text("$0");
  }
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

// function to get the stock from the API
async function getStock(stock) {
  let thisStock;
  // call the stock API with the stock symbol as the query param
  await $.getJSON(
    "https://comp-266-portfolio.raymondmorland.com/api/stocks/stock",
    { symbol: stock },
    (res) => {
      // store local copy of stock data
      thisStock = res;
    }
  );
  // return the stock data
  return thisStock;
}

// function to retrieve the news articles for this stock
async function getSymbolNews(stockSymbol) {
  let stockArticles;

  // get the articles with the stock symbol as the query param
  await $.getJSON(
    "https://comp-266-portfolio.raymondmorland.com/api/news/symbol",
    { symbol: stockSymbol },
    (res) => {
      stockArticles = res;
    }
  );

  // return the stocks articles
  return stockArticles;
}

// load the stock page
$(loadStockPage());
