let portfolioPositions = document.getElementById("portfolio-positions");
let watchlistStocks = document.getElementById("watchlist-stocks");
let portfolioValueEl = document.getElementById("portfolio-value");

function loadPortfolioPage() {
  portfolioValueEl.textContent = "$0";
  let portfolioValue = 0;
  let portfolio = JSON.parse(sessionStorage.getItem("portfolio"));
  let watchlist = JSON.parse(sessionStorage.getItem("watchlist"));
  if (portfolio.length > 0) {
    portfolio.forEach((stk) => {
      let stkPrice = stk.prices[Object.keys(stk.prices)[99]]["4. close"];
      let stkQuantity = getStockFromPortfolio(stk.symbol).quantity;
      let stkChange = 0;

      portfolioValue += Number((stk.quantity * stkPrice).toFixed(2));
      console.log(portfolioValue);
      portfolioValueEl.textContent = `$${portfolioValue}`;

      let portfolioStock = document.createElement("a");
      portfolioStock.setAttribute(
        "class",
        "portfolio-stock white-panel responsive-row justify-between m-0"
      );
      portfolioStock.setAttribute("href", `../invest/stock/${stk.symbol}.html`);
      portfolioStock.innerHTML = `
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
              <h5 class="stock-change">${stkChange} USD</h5>
          </div>
      </div>
      `;

      portfolioPositions.append(portfolioStock);
    });
  } else {
    portfolioPositions.innerHTML = `
      <h3>
        No stocks yet <a href="../invest.html" style="cursor: pointer; font-weight: 800; border-bottom: 5px solid black">find your next investment</a>  
      </h3>
    `;
  }

  if (watchlist.length > 0) {
    watchlist.forEach((stk) => {
      let stock = getStock(stk);
      let stkPrice = stock.prices[Object.keys(stock.prices)[99]]["4. close"];
      let watchlistStock = document.createElement("a");
      watchlistStock.setAttribute(
        "href",
        `../invest/stock/${stock.symbol}.html`
      );
      watchlistStock.setAttribute(
        "class",
        "watchlist-stock row justify-between w-full"
      );

      watchlistStock.innerHTML = `
          <h4 class="watchlist-symbol">${stock.symbol}</h4>
          <h4 class="watchlist-price">$${Number(stkPrice).toFixed(2)}</h4>
      `;

      watchlistStocks.append(watchlistStock);
    });
  } else {
    watchlistStocks.innerHTML = `
      <h4>
        No stocks in your watchlist yet
      </h4>
    `;
  }
}

function resetPortfolioAction() {
  let result = confirm(
    "Are you sure? This will reset your portfolio and watchlist."
  );
  console.log(result);
  if (result) {
    console.log("hi");
    resetPortfolio();
    loadPortfolioPage();
  }
}

loadPortfolioPage();
