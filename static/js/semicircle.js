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
            style: {
                'color': '#fff',
                'weight': 'bold'
            }
        },
        credits: {
            enabled: false
        },
        
        colors: ['#6BB7B9','#F16664','#FFF6E6','#FDAF19','#767676'],

        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                dataLabels: {
                    enabled: true,
                    allowOverlap: true,
                    distance: -40,
                    style: {
                        fontWeight: 'bold',
                        color: 'white'
                    }
                },
                center: ['50%', '50%'],
                startAngle: -150,
                endAngle: 150,
                size: '110%'
            }
        },
        series: [{
            type: 'pie',
            name: 'Anúncios',
            innerSize: '60%',
            data: semicircle
        }]
    });
});
