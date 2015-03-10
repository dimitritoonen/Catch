define(['knockout', 'text!./time-slider.html', 'bindingHandlers/slider'], function(ko, templateMarkup) {

  function TimeSlider(params) {
    
    var self = this;

    self.activityModel = params.activityModel;

    self.beginTime = ko.observable(self.activityModel.Filter.BeginTime());
    self.endTime = ko.observable(self.activityModel.Filter.EndTime());

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

        params.activityModel.Filter.BeginTime(beginTime);
        params.activityModel.Filter.EndTime(endTime);
      });
    }

    
    // set the value of the time slider when the browser is resizing
    $(window).on('resize', function (event) {
      if (self.slider !== null) {
        
        var t = [params.activityModel.Filter.BeginTime(), params.activityModel.Filter.EndTime()];

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
