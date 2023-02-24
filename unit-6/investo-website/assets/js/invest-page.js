/*
 * title: invest-page.js
 * description: functions required for the invest page
 * date: February 19, 2023
 * @author Raymond Morland
 * @version 1.0
 * @copyright 2023 Raymond Morland
 */

let investStocks;
let stockData;
let charts = [];
let chartWrappers = [];

// function to create stock card for each stock in stock data array
function loadInvestPage() {
  // get the stock card container
  investStocks = $("#stocks");
  // get stock data from json file using jQuery
  $.getJSON("/unit-6/investo-website/data/stock-data.json", (res) => {
    // store local copy of stock data array
    stocksData = res.stockData;

    stocksData.forEach((stk) => {
      const keys = Object.keys(stk.prices).reverse();
      const openValues = [];
      keys.forEach((date) => {
        openValues.push(stk.prices[date]["1. open"]);
      });

      let gradient = "rgba(255,255,255";
      let color;

      if (openValues[0] < openValues[openValues.length - 1]) {
        color = "rgba(0,153,0)";
      } else {
        color = "rgba(179,0,0)";
      }
      // calculate current price
      let stkPrice = stk.prices[Object.keys(stk.prices)[99]]["4. close"];
      let openPrice = stk.prices[Object.keys(stk.prices)[Object.keys(stk.prices).length - 1]]["1. open"];
      let stkChange = (openValues[openValues.length - 1] - openValues[0]).toFixed(2);

      console.log(stkChange.slice(0));

      if (stkChange < 0) {
        stkChange = `-$${stkChange.slice(1)}`;
      } else {
        stkChange = `+$${stkChange}`;
      }

      //create new <a> element for stock card info
      let stkCard = $("<a></a>");
      stkCard.attr("href", `./invest/stock/${stk.symbol}.html`);
      stkCard.attr(
        "class",
        "invest-stock responsive-row white-panel justify-between align-center gap-20 m-0"
      );
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
          <h5 class="stock-change">${stkChange} USD</h5>
      </div>
    `);

      // append stock card to invest stock container
      investStocks.append(stkCard);

      var canvas = document.getElementById(`${stk.symbol}-chart`);
      var ctx = canvas.getContext("2d");

      chartWrappers.push($(`#${stk.symbol}-chart-canvas`));
      charts.push(
        buildChart(
          openValues.slice(0, 20),
          keys.slice(0, 20),
          ctx,
          gradient,
          color
        )
      );
    });
  });
}

$(
  // load the invest page data on page load
  loadInvestPage()
);

function drawCharts() {
  // charts.forEach(chart => chart.update());
  // chartWrappers.forEach(wrapper => console.log(wrapper.width()));
}

$(window).on("resize", function () {
  drawCharts();
});
