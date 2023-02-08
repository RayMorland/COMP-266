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
for (let i = 1; i <= 15; i++) {
  // create a new anchor element
  let tickerSymbol = document.createElement("a");
  let secondaryTickerSymbol = document.createElement("a");

  // set the properties of the tickerSymbol and secondaryTickerSymbol to be the same
  tickerSymbol.href = "invest/stock";
  tickerSymbol.classList = ["ticker-symbol"];
  tickerSymbol.innerHTML = "Stock<span class='red'>45%</span>";
  secondaryTickerSymbol.href = "invest/stock";
  secondaryTickerSymbol.classList = ["ticker-symbol"];
  secondaryTickerSymbol.innerHTML = "Stock<span class='red'>45%</span>";

  // add the ticker symbols to the corresponding tickers
  ticker.appendChild(tickerSymbol);
  secondaryTicker.appendChild(secondaryTickerSymbol);
}
