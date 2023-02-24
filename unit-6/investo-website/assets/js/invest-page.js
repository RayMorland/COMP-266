/*
 * title: invest-page.js
 * description: functions required for the invest page
 * date: February 19, 2023
 * @author Raymond Morland
 * @version 1.0
 * @copyright 2023 Raymond Morland
 */

// function to create stock card for each stock in stock data array
function loadInvestPage() {
  // get the stock card container
  let investStocks = $("#stocks");
  // get stock data from json file using jQuery
  $.getJSON("/unit-6/investo-website/data/stock-data.json", (res) => {
    // store local copy of stock data array
    let stocksData = res.stockData;

    stocksData.forEach((stk) => {
      // calculate current price
      let stkPrice = stk.prices[Object.keys(stk.prices)[99]]["4. close"];
      let stkChange = 0;
      //create new <a> element for stock card info
      let stkCard = $("<a></a>");
      stkCard.attr("href", `./invest/stock/${stk.symbol}.html`);
      stkCard.attr(
        "class",
        "invest-stock responsive-row white-panel justify-between align-center m-0"
      );
      stkCard.html(`
      <div class="column m-0 justify-center align-start">
          <h3 class="stock-symbol">${stk.symbol}</h3>
          <h5 class="stock-company-name">${stk.company}</h5>
      </div>
      <div class="column m-0 align-end">
          <h3 class="stock-price">$${Number(stkPrice).toFixed(2)}</h3>
          <h5 class="stock-change">+$${stkChange} USD</h5>
      </div>
    `);
      // append stock card to invest stock container
      investStocks.append(stkCard);
    });
  });
}

$(
  // load the invest page data on page load
  loadInvestPage()
);
