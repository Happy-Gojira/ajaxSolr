google.load('visualization', '1', {'packages': ['geochart']});

      function drawMarkersMap() {
      var data = google.visualization.arrayToDataTable([
        ['City and State'],
        ['Rochester, NY'],
        ['Rochester, NY'],
        ['Rochester, NY'],
        ['Geneseo, NY'],
        ['Rochester, MI'],
        ['Livonia, NY']

      ]);

      var options = {
        region: 'US',
        displayMode: 'markers',
        resolution: 'metros',
        colorAxis: {colors: ['green', 'blue']}
      };

      var chart = new google.visualization.GeoChart(document.getElementById('chart_div'));
      chart.draw(data, options);
    };
    google.setOnLoadCallback(drawMarkersMap);