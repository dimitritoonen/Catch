define(['knockout', 'text!./time-slider.html', 'bindingHandlers/slider'], function(ko, templateMarkup) {

  function TimeSlider(params) {
    
    var self = this;

    var time = params.activityModel.GetFilterTime();

    self.beginTime = ko.observable(time.beginTime());
    self.endTime = ko.observable(time.endTime());

    // gets the element upon slider initialization
    self.onSliderInit = function (slider) {

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

        params.activityModel.SetFilterTime(beginTime, endTime);
      });
    }

  }
  
  return { viewModel: TimeSlider, template: templateMarkup };

});
