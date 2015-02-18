define(['knockout', 'text!./activity-filter-slider.html'], function (ko, templateMarkup) {

  function ActivityFilterSlider(params) {

    var self = this;

    self.participants = params.activityModel.GetFilterParticipants();

    // gets the element upon slider initialization
    self.onSliderInit = function (slider) {

      slider.on('slideStop', function (slider) {
        console.log(slider.value);
        params.activityModel.SetFilterParticipants(slider.value)
      });
    }
  }

  return { viewModel: ActivityFilterSlider, template: templateMarkup };

});