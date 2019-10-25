var perc_rooms = new Array(51.98, 45.66, 2.37);

Highcharts.getJSON('static/nyc-neigh.geo.json', function (geojson) {
    Highcharts.getJSON('static/combo_mean.json', function (combo_mean) {
        Highcharts.getJSON('static/parks.json', function (parks) {
            Highcharts.getJSON('static/choropleth.json', function (prices) {
                Highcharts.getJSON('static/combo_boro.json', function (combo_boro) {                  
                    Highcharts.getJSON('static/combo_bars.json', function (combo_bars) {     
                        Highcharts.getJSON('static/combo_count.json', function (combo_count) {                  

                            //var xAxisCategories = ["Staten Island","Queens","Brooklyn","Manhattan","Bronx", null];
                            var xAxisCategories = combo_boro.boro_name;
                            var price_array = $.map(combo_boro['price'], function(e){ return e});
                            var combo = Highcharts.charts[2];
                            var perc_rooms = new Array(25352, 22270, 1155);

                            Highcharts.mapChart('map', {

                                chart: {
                                    map: geojson,
                                    backgroundColor: '#007D8C',
                                    margin: [5,5,5,5]
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
                                                    this.zoomTo();
                                                    Highcharts.charts[3].mapZoom(4);
                                                    var text = this.ntaname;
                                                    var chart = this.series.chart;
                                                    if(!chart.selectedLabel){
                                                        if (!chart.lbl) {
                                                            chart.lbl = chart.renderer.label(text, 100, 70)
                                                                .attr({
                                                                    padding: 10,
                                                                    r: 5,
                                                                    fill: Highcharts.getOptions().colors[1],
                                                                    zIndex: 5
                                                                })
                                                                .css({
                                                                    color: '#FFFFFF'
                                                                })
                                                                .add();
                                                        } else {
                                                            chart.lbl.attr({
                                                                text: text
                                                            })
                                                            .show();
                                                        }    
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
                                                                data: [combo_mean[text].entire_apt]
                                                            }, {
                                                                data: [combo_mean[text].private_room]
                                                            }, {
                                                                data: [combo_mean[text].shared_room]
                                                            }, {
                                                                data: [(combo_mean[text].entire_apt +
                                                                    combo_mean[text].private_room +
                                                                    combo_mean[text].shared_room)/3],
                                                            }, {
                                                                data: [{
                                                                    name: 'Apartamento',
                                                                    y: combo_count[text].entire_apt,
                                                                    color: '#6BB7B9'
                                                                }, {
                                                                    name: 'Quarto Privado',
                                                                    y: combo_count[text].private_room,
                                                                    color: '#F16664'
                                                                }, {
                                                                    name: 'Quarto Compartilhado',
                                                                    y: combo_count[text].shared_room,
                                                                    color: '#FFF6E6'
                                                                }],
                                                                center: [230, 20]
                                                            }]
                                                        }, true);
                                                    }
                                                },
                                                unselect: function(e){
                                                    var chart = this.series.chart;
                                                    if (chart.lbl) {
                                                        chart.lbl.hide();
                                                    }
                                                }

                                               
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