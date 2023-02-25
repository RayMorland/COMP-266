/*
 * title: portfolio-page.js
 * description: populates the portfolio page with users stock and
 * watchlist information on page load and reloads information when
 * portfolio is reset
 * date: February 24, 2023
 * @author Raymond Morland
 * @version 1.0
 * @copyright 2023 Raymond Morland
 */

// get portfolio stocks, watchlist stocks, and portfolio value elements
let portfolioPositions;
let watchlistStocks;
let portfolioValueEl;

// function to load portfolio data into page
async function loadPortfolioPage() {
  portfolioPositions = $("#portfolio-positions");
  watchlistStocks = $("#watchlist-stocks");
  portfolioValueEl = $("#portfolio-value");
  // set portfolio value to 0 when page loads
  let portfolioValue = 0;
  // retrieve portfolio from session storage
  let portfolio = JSON.parse(sessionStorage.getItem("portfolio"));
  // retrieve the watchlist from session storage
  let watchlist = JSON.parse(sessionStorage.getItem("watchlist"));

  // set the portfolio value element
  portfolioValueEl.text(`$${portfolioValue.toFixed(2)}`);

  // if the portfolio has stocks in it
  if (portfolio.length > 0) {
    // for each stock in portfolio build the stock element
    portfolio.forEach((stk) => {
      // create a new <a> element for the stock
      let portfolioStock = $("<a></a>");
      const priceDates = Object.keys(stk.prices).reverse().slice(0, 20);
      const openValues = [];
      // for each dateTime get the opening value during the interval
      priceDates.forEach((date) => {
        // add the opening price to the openValues array
        openValues.push(stk.prices[date]["1. open"]);
      });
      // set the current price of the stock to the last closing price
      let stkPrice = stk.prices[Object.keys(stk.prices)[99]]["4. close"];
      // set the stock quantity to the quantity of the stock in the portfolio
      let stkQuantity = getStockFromPortfolio(stk.symbol).quantity;
      // set the change in stock value between day open and close

      let stkChange = (stkPrice - openValues[0]).toFixed(2);
      let stkChangeSpan;
  
      // change how the price change is shown depending on if it is less than or greater than 0
      if (stkChange < 0) {
        stkChangeSpan = `-$${stkChange.slice(1)}`;
      } else {
        stkChangeSpan = `+$${stkChange}`;
      }

      // add the value of the stock in the portfolio to the total portfolio value
      portfolioValue += Number((stk.quantity * stkPrice).toFixed(2));
      // set the portfolio value element to the total portfolio value
      portfolioValueEl.text(`$${portfolioValue}`);

      // set the classes of the stock to display it correctly
      portfolioStock.attr(
        "class",
        "portfolio-stock white-panel responsive-row justify-between m-0"
      );
      // set the href of the stock to the stock page
      portfolioStock.attr("href", `../invest/stock/${stk.symbol}.html`);
      // add the html to the stock to display its information using template literals
      portfolioStock.html(`
      <div class="column m-0 justify-start align-start">
          <h3 class="stock-symbol">${stk.symbol}</h3>
          <h5 class="stock-company-name">${stk.company}</h5>
      </div>
      <div class="row justify-end align-start m-0 gap-20">
          <div class="column justify-start align-end m-0 gap-2">
              <h5>My position</h5>
              <h4 class="stock-price">$${(stkPrice * stkQuantity).toFixed(
                2
              )}</h4>
              <h5 class="stock-change">${stkQuantity} shares</h5>
          </div>
          <div class="column justify-start align-end m-0 gap-2">
              <h5>Stock info</h5>
              <h4 class="stock-price">$${Number(stkPrice).toFixed(2)}</h4>
              <h5 class="stock-change">${stkChangeSpan} USD</h5>
          </div>
      </div>
      `);
      // append the stock element to the portfolio stock container
      portfolioPositions.append(portfolioStock);
    });
  } else {
    // if there are no stocks in the portfolio inject HTML with link to invest page
    portfolioPositions.html(`<h3>
        No stocks yet <a href="../invest.html" style="cursor: pointer; font-weight: 800; border-bottom: 5px solid black; font-family: inherit">find your next investment</a>  
      </h3>
    `);
  }
  
  // if the watchlist has at least 1 stock populate the watchlist with the stocks
  if (watchlist.length > 0) {
    // for each symbol in the watchlist add link to stock to watchlist
    watchlist.forEach(async (stk) => {
      // get the stock from stock data using the symbol
      let stock = await getStock(stk);
      // set the current price of the stock to the last closing price
      let stkPrice = stock.prices[Object.keys(stock.prices)[99]]["4. close"];
      // create a new <a> element for the stock data
      let watchlistStock = $("<a></a>");
      // set the href attribute to the stock page
      watchlistStock.attr("href", `../invest/stock/${stock.symbol}.html`);
      // set the CSS classes for the element
      watchlistStock.attr(
        "class",
        "watchlist-stock row justify-between w-full"
      );
      // set the HTML of the element to display the stock data
      watchlistStock.html(`
          <h4 class="watchlist-symbol">${stock.symbol}</h4>
          <h4 class="watchlist-price">$${Number(stkPrice).toFixed(2)}</h4>
      `);

      // append the element to the watchlist
      watchlistStocks.append(watchlistStock);
    });
  } else {
    // if there are no stocks in the watchlist display message
    watchlistStocks.html(`
      <h4>
        No stocks in your watchlist yet
      </h4>
    `);
  }
}

// function to reset the portfolio and watchlist to empty arrays
function resetPortfolioAction() {
  // confirm if user wants to reset the portfolio
  let result = confirm(
    "Are you sure? This will reset your portfolio and watchlist."
  );
  // if they want to reset portfolio call resetportfolio and reload the page
  if (result) {
    resetPortfolio();
    loadPortfolioPage();
  }
}

// load the portfolio page every page load
$(loadPortfolioPage());
