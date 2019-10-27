Highcharts.getJSON('static/piramide.json', function(piramide){

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
                
        colors: ['#6BB7B9','#F16664','#FFF6E6','#FDAF19','#767676'],

        plotOptions: {
            series: {
                    /*allowPointSelect: true,
                            cursor: "pointer",*/
                dataLabels: {
                    enabled: true,
                    distance: 0
                },
                center: ['55%', '65%'],
                width: '75%'

            }
        },

        tooltip: {
            formatter: function(){
                return this.point.name + '<br>Média: <b>US$ ' + piramide['mean'][this.series.data.indexOf(this.point)].toFixed(2) + 
                '</b><br>' + 'Anúncios: <b>' + this.y + '</b>'
            },
            valueDecimals: 2
        },

        legend: {
            enabled: true
        },
        series: [{
            type: 'pyramid',
            name: 'Anúncios',
            data: [{
                    name: 'Bottom',
                    y: piramide['count'][0]
                }, {
                    name: 'Top 25%',
                    y: piramide['count'][1]
                }, {
                    name: 'Top 10%',
                    y: piramide['count'][2]
                }, {
                    name: 'Top 1%',
                    y: piramide['count'][3]
                }
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
    var h3 =  window.innerHeight*(3/10);
    var h4 = Highcharts.charts[0].plotHeight*(1/2);
    Highcharts.charts[0].setSize(undefined, h4);                
});
