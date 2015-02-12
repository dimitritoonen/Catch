define(['knockout', 'text!./activity-filter-slider.html', 'metro-touch-handler', 'metro-slider'], function (ko, templateMarkup) {

  //, 'metro-slider' 

  // constant - the width of the marker in pixels
  var MarkerWidth = 12;

  function ActivityFilterSlider(params) {
    
    var self = this;

    self.participants = ko.observable(2);
    self.relativeMarkerLocation = ko.observable();
        
    // initialize the Metro UI CSS slider component
    $('.participant-slider').slider({
      min: self.participants(),
      change: function (value, ui) {

        self.relativeMarkerLocation(GetMarkerLocation(self));

        self.participants(value);
      }
    });

    // set marker location on load
    self.relativeMarkerLocation(GetMarkerLocation(self));

    $(window).on('resize', { self: self }, ScaleSlider);
  }

  // get the relative location of the marker
  function GetMarkerLocation(self) {
    var element = $('.participant-slider');
    var sliderWith = element.width();
    var markerLocation = element.find('.complete').width() + MarkerWidth;

    // calculate the relative location of the marker
    return markerLocation / sliderWith;
  }

  // scale to slider to it's parent
  function ScaleSlider(event) {

    var self = event.data.self;

    var elementWidth = $('.participant-slider').width();
    var complete = $('.participant-slider').find('.complete');
    var marker = $('.participant-slider').find('.marker');

    var markerLocation = elementWidth * self.relativeMarkerLocation();
    
    complete.width(markerLocation);
    marker.css('left', markerLocation);
  };
  
  return { viewModel: ActivityFilterSlider, template: templateMarkup };

});
