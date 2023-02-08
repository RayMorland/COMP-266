/**
 *
 */

function myFunction() {
  // Create an "li" node:
  const node = document.createElement("li");

  // Create a text node:
  const textnode = document.createTextNode("Water");

  // Append the text node to the "li" node:
  node.appendChild(textnode);

  // Append the "li" node to the list:
  document.getElementById("myList").appendChild(node);
}

/**
 * 
 */

// add or remove multiple classes
div.classList.add("foo", "bar", "baz");
div.classList.remove("foo", "bar", "baz");

/**
 * 
 */

<a
href="stock.html"
class="invest-stock responsive-row white-panel justify-between align-center m-0"
>
<div class="column m-0 justify-center align-start">
  <h3 class="stock-symbol">AAPL</h3>
  <h5 class="stock-company-name">Apple Inc.</h5>
</div>
<!-- Mini stock chart -->
<!-- <div>
  <canvas class="stock-chart-canvas"></canvas>
</div> -->
<div class="column m-0 align-end">
  <h3 class="stock-price">$10.20</h3>
  <h5 class="stock-change">+$0.28 USD</h5>
</div>
</a>

function addStock() {

    // Create an "li" node:
    const investStock = document.createElement("a");

    investStock.add("column", "m-0", "justify")
    
    // Create a text node:
    const textnode = document.createElement
    
    // Append the text node to the "li" node:
    node.appendChild(textnode);
    
    // Append the "li" node to the list:
    document.getElementById("stocks").appendChild(investStock);
    }
