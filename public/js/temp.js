const getInitValues = function () {
  return [1,1];
}



var ctx = document.getElementById("myChart");

var [labels, data ] = getInitValues();

var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [labels],
        datasets: [{
            label: 'Temperature metrics',
            data: [data],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)'
            ],
            fill: true
          }]
    }
});

const getNextValue = function (chart, label, data) {
  if(chart.data.datasets[0].data.length == 20){
    chart.data.labels.splice(0,1);
    chart.data.datasets[0].data.splice(0,1);
  }
  chart.data.labels.push(Date.now());
  chart.data.datasets[0].data.push(Math.random() * (.2) + 4.8);
  chart.update();
}


setInterval(function () {
  getNextValue(myChart, '1', '1')
}, 30000)
