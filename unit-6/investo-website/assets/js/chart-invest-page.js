/*
 * title: chart-invest-page.js
 * description: function for building the chart on the invest page
 * date: February 24, 2023
 * @author Raymond Morland
 * @version 1.0
 * @copyright 2023 Raymond Morland
 */

// function to build the chart for a stock card on the invest page
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
        pointRadius: 0,
        borderColor: color,
        backgroundColor: gradient,
        fill: "origin",
        tension: 0.3,
      },
    ],
  };

  // create a new chart object with the above settings and the canvas' 2D context
  var myNewChart = new Chart(ctx, {
    type: "line",
    data: data,
    options: {
      // make the chart responsive
      responsive: true,
      maintainAspectRatio: true,
      // hide the legend
      plugins: {
        legend: {
          display: false,
        },
      },
      // prevent animation on load
      animation: {
        duration: 0,
      },
      // hide x and y axis
      scales: {
        x: {
          display: false,
          grid: {
            display: false,
          },
        },

        y: {
          display: false,
          grid: {
            display: false,
          },
        },
      },
    },
  });

  // return the chart object
  return myNewChart;
}
