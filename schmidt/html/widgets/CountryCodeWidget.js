var countryCodes = [];
(function ($) {

AjaxSolr.CountryCodeWidget = AjaxSolr.AbstractFacetWidget.extend({
  
afterRequest: function () {
    var self = this;
   
    var maxCount = 0;
    
    for (var facet in this.manager.response.facet_counts.facet_fields[this.field]) {
      var count = parseInt(this.manager.response.facet_counts.facet_fields[this.field][facet]);
      if (count > maxCount) {
        maxCount = count;
      }
      countryCodes.push([facet, count ]);
     
    }
    
    map();


  

    
  }

})



function map(){
  
  var dataArray = [['City and State', 'Drawings']];
  var allCountryCodes = dataArray.concat(countryCodes);

      function drawMarkersMap() {
      var data = google.visualization.arrayToDataTable(allCountryCodes);

      var options = {
        region: '021', //US, US-NY, 019-americas
        displayMode: 'markers',
        //resolution: 'provinces', //can be provinces, countries, or metros
        colorAxis: {colors: ['green', 'blue']}
      };

      var chart = new google.visualization.GeoChart(document.getElementById('countries'));
      chart.draw(data, options);
    };
    google.setOnLoadCallback(drawMarkersMap); 
}


google.load('visualization', '1', {'packages': ['geochart']});
})(jQuery);
