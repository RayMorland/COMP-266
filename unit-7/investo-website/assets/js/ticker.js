/*
  Code Retrieved from
  https://code.mu/en/javascript/book/prime/dom/manipulation/loop-elements-creating/
  on February 8, 2023

  Purpose for Using the Code

  To make the ticker on the top of the home page work, I need to populate it with data.
  The ticker is to used to give the user a sense of what the main purpose of the site is, namely
  stock investing. The stock ticker is a visual aid that users have come to associate with investing 
  through their interactions with other sites, articles, tv shows, and media. I also though it would 
  be interesting to give it some functionality. I wanted to populate it with actual data and also
  have the symbols act as links that can direct users to the investing portion of the site.
  Because the ticker is a single div with many of the same child elements it would be great to
  fill it with symbols using a loop. The below code does just that.

  Explanation of the Code

  The following code gets the parent div using a query selector. It then proceeds to fill the 
  parent with 9 p elements using a for loop and the create element function. Each p element is
  filled with a '!' and then append as a child of parent using the appendChild() function.

  Critique of the Code

  One of the first things you'll notice about this code is the lack of comments. This piece of
  code might not be understood easily by someone who doesn't know about adding, getting, and
  creating DOM elements. Also, while it is obvious that the p variable represents a p element,
  I don't like the use of single character variable names outside of being used as an index 
  such as in the for loop in this code.
*/

/* 
  let parent = document.querySelector('#parent');

  for (let i = 1; i <= 9; i++) {
	  let p = document.createElement('p');
	  p.textContent = '!';

	  parent.appendChild(p);
  }
*/

/*
  My Implementation

  Ok, I may have embellished this one a little. I'm just excited to finally be using some data.
  While this code does the same thing as the original code, it appends child elements (symbols) to
  a parent (ticker) using a loop, it adds quite a bit more content to that child element than a '!'.
  To make this work I had to bring in some actual data (more on this later). This data is in the form
  of an array of objects called stockData and is in the stock-data.js file in the data folder. The
  stock-data.js must be embedded in the page before this script. For each of the stock symbols I 
  create two "a" elements, one for the primary ticker and another for the secondary ticker. The 
  price change is calculated between the beginning of the day and the end of day and is also added
  to the symbol. If the change is 0 or above the green class is added else the red class is added.
 */

let ticker; 
let secondaryTicker;
let stockData;

async function loadTicker() {
  // retrieve the ticker and secondary ticker elements
  ticker = $("#ticker");
  secondaryTicker = $("#secondary-ticker");
  

  await $.getJSON("/unit-6/investo-website/data/stock-data.json", (res) => {
    stockData = res.stockData;
  });

  // use loop to create 15 ticker symbols for both tickers
  for (i = 0; i < stockData.length; i++) {
    // calculate the closing price of the stock
    // Object.keys() is used because the stock data is an object of objects so the
    // keys are turned into an array, the first one, index 0, is retrieved (which is the closing
    // time), and the close price at that time corresponds to the close price for the
    // day
    closePrice =
      stockData[i].prices[Object.keys(stockData[i].prices)[0]]["4. close"];

    // the open price is calculated similarly except the opening time is the last object
    // in the list for which the index is one less than the length of the Object.keys()
    // array
    openPrice =
      stockData[i].prices[
        Object.keys(stockData[i].prices)[
          Object.keys(stockData[i].prices).length - 1
        ]
      ]["1. open"];

    // the price change is calculated as the change relative to the opening price
    // this change is converted to a percentage and then fixed to 2 decimal places
    priceChange = (((closePrice - openPrice) / openPrice) * 100).toFixed(2);

    // if the price change  is greater than or equal to 0 than set the change class to green
    // else change it to red
    let change;
    if (priceChange >= 0) {
      change = "green";
    } else {
      change = "red";
    }

    // create a new anchor element for the symbol and secondary symbol
    let tickerSymbol = $("<a></a>");
    let secondaryTickerSymbol = $("<a></a>");

    // these properties are set using template strings that allow for string interpolation
    // this means we can add javascript variables directly in the string using `` and ${}
    let href = `invest/stock/${stockData[i].symbol}.html`;
    let classList = ["ticker-symbol"];
    let innerHTML = `${stockData[i].symbol}<span class='${change}'>${priceChange}%</span>`;

    // set the properties of the tickerSymbol and secondaryTickerSymbol to be the same
    tickerSymbol.attr("href", href);
    tickerSymbol.attr("class", classList);
    tickerSymbol.html(innerHTML);
    secondaryTickerSymbol.attr("href", href);
    secondaryTickerSymbol.attr("class", classList);
    secondaryTickerSymbol.html(innerHTML);

    // add the ticker symbols to the corresponding tickers
    ticker.append(tickerSymbol);
    secondaryTicker.append(secondaryTickerSymbol);
  }
}

// load the stock ticker on page load
$(loadTicker);
