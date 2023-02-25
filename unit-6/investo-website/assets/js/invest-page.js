/*
 * title: invest-page.js
 * description: functions required for the invest page
 * date: February 19, 2023
 * @author Raymond Morland
 * @version 1.0
 * @copyright 2023 Raymond Morland
 */

// container that holds the invest page stocks
let investStocks;
// variable to hold the stock data
let stockData;

// function to create stock card for each stock in stock data array
async function loadInvestPage() {
  // get the stock card container
  investStocks = $("#stocks");

  // get stock data from json file using jQuery
  await $.getJSON("/unit-6/investo-website/data/stock-data.json", (res) => {
    // store local copy of stock data array
    stocksData = res.stockData;
  });

  // for each stock in the data create the HTML and build and inject the chart
  stocksData.forEach((stk) => {
    // price dateTimes are the keys of the price objects in the data array
    const priceDates = Object.keys(stk.prices).reverse().slice(0,20);
    const openValues = [];
    // for each dateTime get the opening value during the interval
    priceDates.forEach((date) => {
      // add the opening price to the openValues array
      openValues.push(stk.prices[date]["1. open"]);
    });

    // get the current price as the closing price during the last time interval
    let stkPrice =
      stk.prices[Object.keys(stk.prices)[Object.keys(stk.prices).length - 1]][
        "4. close"
      ];
    // the price change is the difference between the first opening price and the current price
    let stkChange = (stkPrice - openValues[0]).toFixed(2);
    let stkChangeSpan;

    // change how the price change is shown depending on if it is less than or greater than 0
    if (stkChange < 0) {
      stkChangeSpan = `-$${stkChange.slice(1)}`;
    } else {
      stkChangeSpan = `+$${stkChange}`;
    }

    // create new <a> element for stock card info
    let stkCard = $("<a></a>");
    // set the stock card's href to the stock's page
    stkCard.attr("href", `./invest/stock/${stk.symbol}.html`);
    // set the CSS classes on the stock card
    stkCard.attr(
      "class",
      "invest-stock responsive-row white-panel justify-between align-center gap-20 m-0"
    );
    // set the HTML for the stock card
    stkCard.html(`
    <div class="column m-0 justify-center align-start-center stock-card-info">
        <h3 class="stock-symbol">${stk.symbol}</h3>
        <h5 class="stock-company-name">${stk.company}</h5>
    </div>
    <div id="${stk.symbol}-chart-canvas" class="stock-chart-canvas w-50-100">
      <canvas id="${stk.symbol}-chart"></canvas>
     </div> 
    <div class="column m-0 align-end-center stock-card-price">
        <h3 class="stock-price">$${Number(stkPrice).toFixed(2)}</h3>
        <h5 class="stock-change">${stkChangeSpan} USD</h5>
    </div>
  `);

    // append stock card to invest stock container
    investStocks.append(stkCard);

    let gradient = "rgba(255,255,255";
    let color;

    // change the chart line color depending on whether the stk change is greater than or less than 0
    if (stkChange >= 0) {
      color = "rgba(0,153,0)";
    } else {
      color = "rgba(179,0,0)";
    }

    // get te canvas element for this stock
    var canvas = document.getElementById(`${stk.symbol}-chart`);
    // get the 2d context of the canvas element
    var ctx = canvas.getContext("2d");

    // build the chart for this stock
    buildChart(
      openValues,
      priceDates,
      ctx,
      gradient,
      color
    );
  });
}

// load the invest page data on page load
$(loadInvestPage());
