define(['knockout', 'text!./time-slider.html', 'bindingHandlers/slider'], function(ko, templateMarkup) {

  function TimeSlider(params) {
    
    var self = this;

    self.beginTime = params.beginTime;
    self.endTime = params.endTime;

    self.slider;

    // gets the element upon slider initialization
    self.onSliderInit = function (slider) {

      self.slider = slider;

      // update the user interface when sliding
      slider.on('change', function (slider) {
        var beginTime = slider.value.newValue[0];
        var endTime = slider.value.newValue[1];

        self.beginTime(beginTime);
        self.endTime(endTime);
      });

      // update the activities list based on chosen value
      slider.on('slideStop', function (slider) {
        var beginTime = slider.value[0];
        var endTime = slider.value[1];

        self.beginTime(beginTime);
        self.endTime(endTime);
      });
    }

    
    // set the value of the time slider when the browser is resizing
    $(window).on('resize', function (event) {
      if (self.slider !== null) {

        var t = [self.beginTime(), self.endTime()];

        $(self.slider).slider('setValue', t);
      }
    });
  }

  // cleanup event handlers
  TimeSlider.prototype.dispose = function () {
    $(window).off('resize');

    $(self.slider).off('change');
    $(self.slider).off('slideStop');
  }
  
  return { viewModel: TimeSlider, template: templateMarkup };

});
