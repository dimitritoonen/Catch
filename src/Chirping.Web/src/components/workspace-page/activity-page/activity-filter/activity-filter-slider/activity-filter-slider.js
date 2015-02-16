define(['knockout', 'text!./activity-filter-slider.html', 'metro-touch-handler', 'metro-slider'], function (ko, templateMarkup) {
  
  // constant - the width of the marker in pixels
  var MarkerWidth = 12;

  function ActivityFilterSlider(params) {
    
    var self = this;
    
    self.filter = params.activityModel.Filter;

    params.activityModel.SliderMarkerPosition.subscribe(function () {
      console.log('changed: ' + params.activityModel.SliderMarkerPosition());
    });
    
    // gets the element upon slider initialization
    self.onSliderInit = function (slider) {
      params.activityModel.SliderMarkerPosition(GetMarkerLocation(slider));

      $(window).on('resize', {
        markerPosition: params.activityModel.SliderMarkerPosition,
        slider: slider
      }, ScaleSlider);
    }

    // stores the chosen value on slider changed
    self.onSliderChanged = function (value, slider) {
      self.filter.Participants(value);

      params.activityModel.SliderMarkerPosition(GetMarkerLocation(slider));
    }
  }

  // get the relative location of the marker
  function GetMarkerLocation(slider) {

    var element = $(slider);
    var sliderWith = element.width();
    var markerLocation = element.find('.complete').width() + MarkerWidth;
    
    if (sliderWith === 0)
      return;

    // calculate the relative location of the marker
    return markerLocation / sliderWith;
  }

  // scale to slider to it's parent
  function ScaleSlider(event) {
    var slider = event.data.slider;
    var markerPosition = event.data.markerPosition;
        
    var elementWidth = $(slider).width();
    var complete = $(slider).find('.complete');
    var marker = $(slider).find('.marker');
    
    var markerLocation = (elementWidth - MarkerWidth) * markerPosition();
    
    complete.width(markerLocation);
    marker.css('left', markerLocation);
  }
  
  return { viewModel: ActivityFilterSlider, template: templateMarkup };

});
