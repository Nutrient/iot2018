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
            label: 'Air quality metrics',
            data: [data],
            backgroundColor: [
                'rgba(99, 132, 255, 0.2)'
            ],
            borderColor: [
                'rgba(99,132,255,1)'
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
  chart.data.datasets[0].data.push(Math.floor(Math.random() * 20) + 390);
  chart.update();
}


setInterval(function () {
  getNextValue(myChart, '1', '1')
}, 30000)
