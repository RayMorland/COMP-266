function buildChart(prices, times, ctx, backGrad, color) {
  var gradient = ctx.createLinearGradient(0, 0, 0, 400);
  gradient.addColorStop(0, `${backGrad}, .5)`);
  gradient.addColorStop(1, `${backGrad}, 0)`);

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
  var myNewChart = new Chart(ctx, {
    type: "line",
    data: data,
    options: {
      responsive: true,
      maintainAspectRatio: true,
    //   onRes
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          mode: 'index',
          intersect: false
          }
      },
      animation: {
        duration: 0,
      },
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

  return myNewChart;
}