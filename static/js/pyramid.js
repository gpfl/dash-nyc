Highcharts.chart('pyramid', {
    chart: {
        type: 'pyramid',
        backgroundColor: null
    },

    credits: {
        enabled: false
    },

    title: {
        text: '',
    },
    plotOptions: {
        series: {
                /*allowPointSelect: true,
                        cursor: "pointer",*/
            dataLabels: {
                enabled: true
            },
            center: ['40%', '40%'],
            height: '60%',
            width: '45%'
        }
    },
    legend: {
        enabled: true
    },
    series: [{
        name: 'Unique users',
        data: [
            ['Bottom 75%', 15654],
            ['Top 25%', 4064],
            ['Top 10%', 1987],
            ['Top 5%', 976],
            ['Top 1%', 846]
        ]
    }],

    responsive: {
        rules: [{
            condition: {
                maxWidth: 500
            },
            chartOptions: {
                plotOptions: {
                    series: {
                        dataLabels: {
                            inside: false
                        }
                    }
                }
            }
        }]
    }
});
var h3 =  window.innerHeight*(2/5);
Highcharts.charts[0].setSize(undefined, h3);                
