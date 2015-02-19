define(['knockout', 'text!./participant-slider.html', 'bindingHandlers/slider'], function (ko, templateMarkup) {

  function ParticipantSlider(params) {

    var self = this;

    self.participants = params.activityModel.GetFilterParticipants();

    // gets the element upon slider initialization
    self.onSliderInit = function (slider) {

      slider.on('slideStop', function (slider) {
        params.activityModel.SetFilterParticipants(slider.value)
      });
    }
  }

  return { viewModel: ParticipantSlider, template: templateMarkup };

});