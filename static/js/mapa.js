var perc_rooms = new Array(51.98, 45.66, 2.37);

Highcharts.getJSON('static/nyc-neigh.geo.json', function (geojson) {
    Highcharts.getJSON('static/combo_mean.json', function (combo_mean) {
        Highcharts.getJSON('static/parks.json', function (parks) {
            Highcharts.getJSON('static/choropleth.json', function (prices) {
                Highcharts.getJSON('static/combo_bars.json', function (combo_bars) {                  

                    var xAxisCategories = ["Staten Island","Queens","Brooklyn","Manhattan","Bronx", null];
                    var combo = Highcharts.charts[2];

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

                                            
                                            var new_data = combo_mean[text];
                                            var new_mean = ((new_data.entire_apt + new_data.private_room + new_data.shared_room)/3);
                                            combo.axes[0].update({categories : {5: text }});
                                            combo.series[0].addPoint(new_data.entire_apt, true);
                                            combo.series[1].addPoint(new_data.private_room, true);
                                            combo.series[2].addPoint(new_data.shared_room, true);
                                            combo.series[3].addPoint(new_mean, true);
                                        },
                                        unselect: function(e){
                                            Highcharts.charts[3].mapZoom(8);
                                            var chart = this.series.chart;
                                            if (chart.lbl) {
                                                chart.lbl.hide();
                                            }
                                            combo.axes[0].update({ categories: xAxisCategories });
                                            combo.series[0].update({ data: combo_bars[0] }, true);
                                            combo.series[1].update({ data: combo_bars[1] }, true);
                                            combo.series[2].update({ data: combo_bars[2] }, true);
                                            combo.series[3].update({ data: combo_bars[3] }, true);
                                            
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