Highcharts.getJSON('static/combo_boro.json', function (combo_boro) {
    Highcharts.getJSON('static/combo_bars.json', function (combo_bars) {

        //var boro_price = JSON.parse(combo_boro['price']);
        var price_array = $.map(combo_boro['price'], function(e){ return e});
        var perc_rooms = new Array(25352, 22270, 1155);

        Highcharts.chart('combo', {
            chart: {
                backgroundColor: 'rgba(0,0,0,0)'
            },

            credits: {
                enabled: false
            },

            colors: ['#6BB7B9','#F16664','#FFF6E6','#FDAF19','#767676'],

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
                    fillColor: '#cc8d14'
                }
            }, {
                type: 'pie',
                name: 'Percentual',
                data: [{
                    name: 'Apartamento',
                    y: perc_rooms[0],
                    color: '#6BB7B9'
                }, {
                    name: 'Quarto Privado',
                    y: perc_rooms[1],
                    color: '#F16664'
                }, {
                    name: 'Quarto Compartilhado',
                    y: perc_rooms[2],
                    color: '#FFF6E6'
                }],
                center: [60, 20],
                size: 65,
                tooltip: {
                    pointFormat: '<b>{point.y}</b><br/>',
                    valueSuffix: ' anúncios'
                },
                showInLegend: false,
                dataLabels: {
                    enabled: false
                }
            }]
        });
        var combo = Highcharts.charts[2];
        var x_btn = combo.plotWidth - 5;
        console.log(x_btn);
        var h2 =  window.innerHeight*(2/5);
        combo.setSize(null, h2);

        combo.renderer.button('Reset', x_btn, 15)
            .attr({
                zIndex: 7
            })
            .on('click', function(e){
                Highcharts.charts[2].update({
                    chart: {
                        spacingLeft: 10,
                        spacingRight: 10
                    },
                    xAxis: {
                        categories: combo_boro.boro_name
                    },
                    legend: {
                        x: 0
                    },
                    series: [{
                        data: combo_bars[0]
                    }, {
                        data: combo_bars[1]
                    }, {
                        data: combo_bars[2]
                    }, {
                        data: price_array,
                    }, {
                        data: [{
                            name: 'Apartamento',
                            y: perc_rooms[0],
                            color: '#6BB7B9'
                        }, {
                            name: 'Quarto Privado',
                            y: perc_rooms[1],
                            color: '#F16664'
                        }, {
                            name: 'Quarto Compartilhado',
                            y: perc_rooms[2],
                            color: '#FFF6E6'
                        }],
                        center: [60, 20]
                    }]
                }, true);
            })
            .add(); 
    });
});
