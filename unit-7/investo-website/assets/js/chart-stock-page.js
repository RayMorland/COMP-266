/*
 * title: chart-stock-page.js
 * description: function for building the chart on the stock pages
 * date: February 24, 2023
 * @author Raymond Morland
 * @version 1.0
 * @copyright 2023 Raymond Morland
 */

// function to build the chart for a stock card on the stock pages
function buildChart(prices, times, ctx, backGrad, color) {
  // set background gradient
  var gradient = ctx.createLinearGradient(0, 0, 0, 400);
  gradient.addColorStop(0, `${backGrad}, .5)`);
  gradient.addColorStop(1, `${backGrad}, 0)`);

  // set the data values, line type, and settings
  // the x values are the price time and the y values are the prices
  var data = {
    labels: times,
    datasets: [
      {
        type: "line",
        label: "Basic",
        data: prices,
        pointRadius: 2,
        borderColor: color,
        backgroundColor: gradient,
        fill: "origin",
        tension: 0.3,
      },
    ],
  };

  // create a new chart object
  var myNewChart = new Chart(ctx, {
    type: "line",
    data: data,
    options: {
      // make the chart responsive
      responsive: true,
      maintainAspectRatio: true,
      // hide the legend but show tooltip on chart hover
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          mode: 'index',
          intersect: false
          }
      },
      // prevent animation on chart load
      animation: {
        duration: 0,
      },
      // hide the x axis and grid lines and show the y axis and grid lines
      scales: {
        x: {
          display: false,
          grid: {
            display: false,
          },
        },

        y: {
          display: true,
          grid: {
            display: true,
          },
        },
      },
    },
  });

  // return the new chart object
  return myNewChart;
}
