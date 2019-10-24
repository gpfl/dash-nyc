Highcharts.getJSON('static/combo_boro.json', function (combo_boro) {
    Highcharts.getJSON('static/combo_bars.json', function (combo_bars) {

        //var boro_price = JSON.parse(combo_boro['price']);
        var price_array = $.map(combo_boro['price'], function(e){ return e});
        var perc_rooms = new Array(51.98, 45.66, 2.37);

        Highcharts.chart('combo', {
            chart: {
                backgroundColor: 'rgba(0,0,0,0)'
            },

            credits: {
                enabled: false
            },

            title: {
                text: ''
            },
            xAxis: {
                categories: combo_boro.boro_name,
                gridLineColor: '#707073',
                labels: {
                    style: {
                        color: '#E0E0E3'
                    }
                },
                lineColor: '#707073',
                minorGridLineColor: '#505053',
                tickColor: '#707073',
                title: {
                    style: {
                        color: '#A0A0A3'

                    }
                }
            },
            yAxis: {
                gridLineColor: '#E0E0E3',
                labels: {
                    style: {
                        color: '#E0E0E3'
                    }
                },
                lineColor: '#E0E0E3',
                minorGridLineColor: '#505053',
                tickColor: '#E0E0E3',
                tickWidth: 1,
                title: {
                    style: {
                        color: '#A0A0A3'
                    }
                }
            },
            tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.85)',
                style: {
                    color: '#F0F0F0'
                }
            },
            labels: {
                items: [{
                    html: 'Tipos de Aluguel',
                    style: {
                        left: '70px',
                        top: '15px',
                        color: '#E0E0E3'
                    }
                }]
            },
            legend: {
                backgroundColor: 'rgba(0, 0, 0, 0.2)',
                itemStyle: {
                    color: '#E0E0E3'
                },
                itemHoverStyle: {
                    color: '#FFF'
                },
                itemHiddenStyle: {
                    color: '#606063'
                },
                title: {
                    style: {
                        color: '#C0C0C0'
                    }
                }
            },
            series: [{
                type: 'column',
                name: 'Apartamento',
                data: combo_bars[0]
            }, {
                type: 'column',
                name: 'Quarto Privado',
                data: combo_bars[1]
            }, {
                type: 'column',
                name: 'Quarto Compartilhado',
                data: combo_bars[2]
            }, {
                type: 'spline',
                name: 'Média',
                data: price_array,
                marker: {
                    lineWidth: 2,
                    lineColor: Highcharts.getOptions().colors[3],
                    fillColor: 'white'
                }
            }, {
                type: 'pie',
                name: 'Percentual',
                data: [{
                    name: 'Apartamento',
                    y: perc_rooms[0],
                    color: Highcharts.getOptions().colors[0]
                }, {
                    name: 'Quarto Privado',
                    y: perc_rooms[1],
                    color: Highcharts.getOptions().colors[1]
                }, {
                    name: 'Quarto Compartilhado',
                    y: perc_rooms[2],
                    color: Highcharts.getOptions().colors[2]
                }],
                center: [100, 50],
                size: 70,
                tooltip: {
                    pointFormat: '<b>{point.y}</b><br/>',
                    valueSuffix: '%'
                },
                showInLegend: false,
                dataLabels: {
                    enabled: false
                }
            }]
        });
        var h2 =  window.innerHeight*(2/5);
        Highcharts.charts[2].setSize(undefined, h2);                
    });
});
