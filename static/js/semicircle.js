Highcharts.getJSON('static/semicircle.json', function (semicircle) {

    Highcharts.chart('semicircle', {
        chart: {
            backgroundColor: null,
            plotBackgroundColor: null,
            plotBorderWidth: 0,
            plotShadow: false
        },
        title: {
            text: 'Boroughs',
            align: 'center',
            verticalAlign: 'middle',
        },
        credits: {
            enabled: false
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                dataLabels: {
                    enabled: true,
                    distance: -50,
                    style: {
                        fontWeight: 'bold',
                        color: 'white'
                    }
                },
                center: ['50%', '50%'],
                startAngle: -150,
                endAngle: 150,
                size: '100%'
            }
        },
        series: [{
            type: 'pie',
            name: 'Browser share',
            innerSize: '50%',
            data: semicircle
        }]
    });
});
