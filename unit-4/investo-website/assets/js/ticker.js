/**
 *  Code Retrieved from
    https://code.mu/en/javascript/book/prime/dom/manipulation/loop-elements-creating/
    on February 8, 2023
 */

// let parent = document.querySelector('#parent');

// for (let i = 1; i <= 9; i++) {
// 	let p = document.createElement('p');
// 	p.textContent = '!';

// 	parent.appendChild(p);
// }

/**
 * My Implementation
 */

// retrieve the ticker and secondary ticker elements
let ticker = document.getElementById("ticker");
let secondaryTicker = document.getElementById("secondary-ticker");

// use loop to create 15 ticker symbols for both tickers
for (i = 0; i < stockData.length; i++) {
  console.log(Object.keys(stockData[i].prices).length - 1);

  closePrice =
    stockData[i].prices[Object.keys(stockData[i].prices)[0]]["4. close"];

  openPrice =
    stockData[i].prices[
      Object.keys(stockData[i].prices)[
        Object.keys(stockData[i].prices).length - 1
      ]
    ]["1. open"];
  console.log(openPrice);
  console.log(closePrice);

  priceChange = (((closePrice - openPrice) / openPrice) * 100).toFixed(2);

  let change;
  if (priceChange >= 0) {
    change = "green";
  } else {
    change = "red";
  }

  console.log(priceChange);
  // create a new anchor element
  let tickerSymbol = document.createElement("a");
  let secondaryTickerSymbol = document.createElement("a");

  // set the properties of the tickerSymbol and secondaryTickerSymbol to be the same
  tickerSymbol.href = "invest/stock";
  tickerSymbol.classList = ["ticker-symbol"];
  tickerSymbol.innerHTML = `${stockData[i].symbol}<span class='${change}'>${priceChange}%</span>`;
  secondaryTickerSymbol.href = "invest/stock";
  secondaryTickerSymbol.classList = ["ticker-symbol"];
  secondaryTickerSymbol.innerHTML = `${stockData[i].symbol}<span class='${change}'>${priceChange}%</span>`;

  // add the ticker symbols to the corresponding tickers
  ticker.appendChild(tickerSymbol);
  secondaryTicker.appendChild(secondaryTickerSymbol);
}
