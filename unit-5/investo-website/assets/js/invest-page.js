/*
 * title: invest-page.js
 * description: functions required for the invest page
 * date: February 19, 2023
 * @author Raymond Morland
 * @version 1.0
 * @copyright 2023 Raymond Morland
 */

let investStocks = document.getElementById("stocks");
let stocksData = stockData;

stocksData.forEach((stk) => {
  let stkPrice = stk.prices[Object.keys(stk.prices)[99]]["4. close"];
  let stkChange = 0;
  let stkCard = document.createElement("a");
  stkCard.setAttribute("href", `./invest/stock/${stk.symbol}.html`);
  stkCard.setAttribute(
    "class",
    "invest-stock responsive-row white-panel justify-between align-center m-0"
  );
  stkCard.innerHTML = `
    <div class="column m-0 justify-center align-start">
        <h3 class="stock-symbol">${stk.symbol}</h3>
        <h5 class="stock-company-name">${stk.company}</h5>
    </div>
    <div class="column m-0 align-end">
        <h3 class="stock-price">$${Number(stkPrice).toFixed(2)}</h3>
        <h5 class="stock-change">+$${stkChange} USD</h5>
    </div>
  `;
  investStocks.append(stkCard);
});
