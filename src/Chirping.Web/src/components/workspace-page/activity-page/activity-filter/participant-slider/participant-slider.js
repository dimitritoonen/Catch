define(['knockout', 'text!./participant-slider.html', 'bindingHandlers/slider'], function (ko, templateMarkup) {

  function ParticipantSlider(params) {

    var self = this;

    self.participants = params.activityModel.Filter.Participants;

    var participantSlider;

    // gets the element upon slider initialization
    self.onSliderInit = function (slider) {

      participantSlider = slider;

      slider.on('slideStop', function (slider) {
        params.activityModel.Filter.Participants(slider.value)
      });
    }

    // set the value of the participant slider when the browser is resizing
    $(window).on('resize', function (event) {
      if (participantSlider !== null) {
        var value = params.activityModel.Filter.Participants();

        $(participantSlider).slider('setValue', value);
      }
    });
  }

  return { viewModel: ParticipantSlider, template: templateMarkup };

});