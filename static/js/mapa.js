var perc_rooms = new Array(51.98, 45.66, 2.37);

Highcharts.getJSON('static/nyc-neigh.geo.json', function (geojson) {
    Highcharts.getJSON('static/combo_mean.json', function (combo_mean) {
        Highcharts.getJSON('static/parks.json', function (parks) {
            Highcharts.getJSON('static/choropleth.json', function (prices) {
                Highcharts.getJSON('static/combo_boro.json', function (combo_boro) {                  
                    Highcharts.getJSON('static/combo_bars.json', function (combo_bars) {     
                        Highcharts.getJSON('static/combo_count.json', function (combo_count) {                  

                            //var xAxisCategories = ["Staten Island","Queens","Brooklyn","Manhattan","Bronx", null];
                            //var xAxisCategories = combo_boro.boro_name;
                            //var price_array = $.map(combo_boro['price'], function(e){ return e});
                            var combo = Highcharts.charts[2];
                            var zoom_btn = false;
                            //var perc_rooms = new Array(25352, 22270, 1155);

                            Highcharts.mapChart('map', {

                                chart: {
                                    map: geojson,
                                    backgroundColor: '#007D8C',
                                    margin: [5,5,5,5]
                                },
                                
                                subtitle: {
                                    text: 'Clique nos bairros para ver detalhes',
                                    align: 'left',
                                    style: {
                                        'color': '#fff',
                                        'font-size': '1.2em',
                                        'font-style': 'italic'
                                    }
                                },
                                
                                credits: {
                                    enabled: false
                                },
                                legend: {
                                    enabled: false
                                },
                        
                                title: {
                                    text: ''
                                },
                                xAxis: {
                                    minRange: .01
                                },
                                yAxis: {
                                    minRange: .01
                                },
                                
                                plotOptions: {
                                    map: {
                                        allAreas: false
                                    },
                                    series: {
                                        point: {
                                            events: {
                                                select: function(e) {
                                                    var text = this.ntaname;
                                                    var chart = this.series.chart;
                                                    var x_btn = chart.plotWidth - 120;
                                                    //var extremes = chart.yAxis[0].getExtremes();

                                                    if (typeof combo_mean[text].entire_apt == 'undefined') {
                                                        var entire_apt = 0;
                                                    } else {
                                                        var entire_apt = combo_mean[text].entire_apt;
                                                    }
                                                    if (typeof combo_mean[text].private_room == 'undefined') {
                                                        var private_room = 0;
                                                    } else {
                                                        var private_room = combo_mean[text].private_room;
                                                    }
                                                    if (typeof combo_mean[text].shared_room == 'undefined') {
                                                        var shared_room = 0;
                                                    } else {
                                                        var shared_room = combo_mean[text].shared_room;
                                                    }

                                                    if (typeof combo_count[text].entire_apt == 'undefined') {
                                                        var count_entire_apt = 0;
                                                    } else {
                                                        var count_entire_apt = combo_count[text].entire_apt;
                                                    }
                                                    if (typeof combo_count[text].private_room == 'undefined') {
                                                        var count_private_room = 0;
                                                    } else {
                                                        var count_private_room = combo_count[text].private_room;
                                                    }
                                                    if (typeof combo_count[text].shared_room == 'undefined') {
                                                        var count_shared_room = 0;
                                                    } else {
                                                        var count_shared_room = combo_count[text].shared_room;
                                                    }
                                                    
                                                    this.zoomTo();
                                                    Highcharts.charts[3].mapZoom(6);    
                                                    var total_anuncios = count_entire_apt +
                                                                        count_private_room +
                                                                        count_shared_room;
                                                    var lbl_text = '<b>' + text + '</b>';
                                                    var lbl2_text = 'Total de anúncios: <b>' + total_anuncios + '</b>';
                                                    
                                                    var lbl3_text = 'Apartamentos: <b>US$' + entire_apt + '<b><br/>' +
                                                        'Quartos privados: <b>US$' + private_room + '<b><br/>' +
                                                        'Quartos Compartilhados: <b>US$' + shared_room + '<b><br/>';

                                                    if(!chart.lbl){
                                                        chart.lbl = chart.renderer.label(lbl_text, 50, 50)
                                                            .attr({
                                                                padding: 10,
                                                                r: 5,
                                                                fill: Highcharts.getOptions().colors[1],
                                                                zIndex: 5
                                                            })
                                                            .css({
                                                                'color': '#FFFFFF',
                                                                'font-size': '1.2em'
                                                            })
                                                            .add().show();
                                                    } else {
                                                        chart.lbl.attr({
                                                            text: lbl_text
                                                        }).show();
                                                    }
                                                    if(!chart.lbl2){
                                                        chart.lbl2 = chart.renderer.label(lbl2_text, 50, 90)
                                                            .attr({
                                                                padding: 10,
                                                                r: 5,
                                                                fill: Highcharts.getOptions().colors[1],
                                                                zIndex: 5
                                                            })
                                                            .css({
                                                                'color': '#dedcdc',
                                                                'font-size': '1.1em',
                                                                'line-height': '1.6'
                                                            })
                                                            .add().show();
                                                    } else {
                                                        chart.lbl2.attr({
                                                            text: lbl2_text
                                                        }).show();
                                                    }
                                                    if(!chart.lbl3){
                                                        chart.lbl3 = chart.renderer.label(lbl3_text, 50, 130)
                                                            .attr({
                                                                padding: 10,
                                                                r: 5,
                                                                fill: Highcharts.getOptions().colors[1],
                                                                zIndex: 5
                                                            })
                                                            .css({
                                                                'color': '#dedcdc',
                                                                'font-size': '1.1em',
                                                                'line-height': '1.6'
                                                            })
                                                            .add().show();
                                                    } else {
                                                        chart.lbl3.attr({
                                                            text: lbl3_text
                                                        }).show();
                                                    }
                                                    
                                                    if(!zoom_btn){
                                                        chart.renderer.button('Reset',x_btn, 15)
                                                            .attr({
                                                                zIndex: 8
                                                            })
                                                            .on('click', function(e){
                                                                chart.mapZoom(8);
                                                                chart.series[0].data[0].select(false);
                                                                chart.lbl.hide();
                                                                chart.lbl2.hide();
                                                                chart.lbl3.hide();
                                                            })
                                                            .add();
                                                        zoom_btn = true;    
                                                    }                                                                                             
                                                    if(!chart.selectedLabel) {
                                                        combo.update({
                                                            chart: {
                                                                spacingLeft: 100,
                                                                spacingRight: 100
                                                            },
                                                            xAxis: {
                                                                categories: [text]
                                                            },
                                                            legend: {
                                                                x: 0
                                                            },
                                                            series: [{
                                                                data: [entire_apt]
                                                            }, {
                                                                data: [private_room]
                                                            }, {
                                                                data: [shared_room]
                                                            }, {
                                                                data: [(entire_apt +
                                                                    private_room +
                                                                    shared_room)/3],
                                                            }, {
                                                                data: [{
                                                                    name: 'Apartamento',
                                                                    y: count_entire_apt,
                                                                    color: '#6BB7B9'
                                                                }, {
                                                                    name: 'Quarto Privado',
                                                                    y: count_private_room,
                                                                    color: '#F16664'
                                                                }, {
                                                                    name: 'Quarto Compartilhado',
                                                                    y: count_shared_room,
                                                                    color: '#FFF6E6'
                                                                }],
                                                                center: [5, 20]
                                                            }]
                                                        }, true);
                                                    }
                                                },
                                            }
                                        },
                                    }
                                },

                                mapNavigation: {
                                    enabled: true,
                                    buttonOptions: {
                                        verticalAlign: 'bottom'
                                    },
                                    buttons: {
                                        zoomIn: {
                                            onclick: function () { this.mapZoom(0.4); }
                                        },
                                        zoomOut: {
                                            onclick: function () { this.mapZoom(2.5); }
                                        }
                                    }
                                },
                        
                                colorAxis: [{
                                    type: 'logarithmic',
                                    allowNegativeLog: true,
                                    tickPixelInterval: 100,
                                    min: 40,
                                    max: 250,
                                    minColor: '#fcfbf7',
                                    maxColor: '#843634'
                                },
                                {
                                    maxColor: '#a8d6a5'
                                }],
                        
                                series: [
                                {
                                    data: prices,
                                    name: 'Bairros',
                                    showInLegend: false,
                                    allowPointSelect: true,
                                    keys: ['ntaname','value'],
                                    joinBy: 'ntaname',
                                    states: {
                                        hover: {
                                            brightness: 0.3
                                        },
                                        select: { 
                                            color: '#cf8886',
                                            borderColor: '#b60702',
                                            borderWidth: 10
                                        }
                                    },
                                    tooltip: {
                                        pointFormat: '<strong>{point.ntaname}</strong><br>' + 'Preço mediano: US${point.value}<br>',
                                    }
                                },
                                {
                                    data: parks,
                                    name: "Parks",
                                    keys: ['ntaname','value'],
                                    joinBy: 'ntaname',
                                    colorAxis: 1,
                                    enableMouseTracking: false,
                                    tooltip: {
                                        enabled: false
                                    }
                                }]
                            });
                            var h =  window.innerHeight;
                            Highcharts.charts[3].setSize(undefined, h);
                        });
                    });
                });
            });
        });
    });
});