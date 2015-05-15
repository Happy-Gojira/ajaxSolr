(function ($) {

AjaxSolr.ResultWidget = AjaxSolr.AbstractWidget.extend({
  /* 
    afterRequest, 
    which each widget runs after the Manager receives the Solr response. 
    The Manager stores the response in 
    Manager.response 
    (which the widgets may access through this.manager.response).
  */
  start: 0,

  

facetLinks: function (facet_field, facet_values) {
  var links = [];
  if (facet_values) {
    for (var i = 0, l = facet_values.length; i < l; i++) {
      links.push(
        $('<a href="#"></a>')
        .text(facet_values[i])
        .click(this.facetHandler(facet_field, facet_values[i]))
      );
    }
  }
  return links;
},

facetHandler: function (facet_field, facet_value) {
  var self = this;
  return function () {
    self.manager.store.remove('fq');
    self.manager.store.addByValue('fq', facet_field + ':' + AjaxSolr.Parameter.escapeValue(facet_value));
    self.doRequest(0);
    return false;
  };
},

  afterRequest: function () {
    $(this.target).empty();
    for (var i = 0, l = this.manager.response.response.docs.length; i < l; i++) {
      var doc = this.manager.response.response.docs[i];
      $(this.target).append(this.template(doc));

      var items = [];
      items = items.concat(this.facetLinks('geolocation', doc.geolocation));
      var $links = $('#links_' + doc.id);
      $links.empty();
      for (var j = 0, m = items.length; j < m; j++) {
      $links.append($('<li></li>').append(items[j]));
      }

    }
  },

  template: function (doc) {
    var snippet = '';
    if (doc.subject.length > 300) {
      snippet += doc.subject+ ' ' + doc.content.substring(0, 300);
      snippet += '<span style="display:none;">' + doc.content.substring(300);
      snippet += '</span> <a href="#" class="more">more</a>';
    }
    else {
      if(doc.content && doc.container)
      {
        snippet +='Contains: ' + doc.content + ' Stored in: ' + doc.container;
      }
      else if(doc.location && doc.label)
      {
        snippet +='Label: ' + doc.label + ' Stored in: ' + doc.location;
      }
      else{
        snippet += ' Stored in: ' + doc.location;
      }

    }

    if(doc.url){
      var image = doc.url;

    }

    var output = '<div><h2>' + doc.subject + '</h2>';
    output += '<p id="links_' + doc.id + '" class="links"></p>';
    if(doc.url){output += ' <img class="drawing" src="' + doc.url + '"alt="drawing not found">';}
    output += '<p>' + snippet + '</p></div>';
    return output;
  }
});

})(jQuery);