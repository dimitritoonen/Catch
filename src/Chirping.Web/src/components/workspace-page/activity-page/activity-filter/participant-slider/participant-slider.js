define(['knockout', 'text!./participant-slider.html', 'bindingHandlers/slider'], function (ko, templateMarkup) {

  function ParticipantSlider(params) {

    var self = this;

    self.participants = params.activityModel.Filter.Participants;

    self.slider;

    // gets the element upon slider initialization
    self.onSliderInit = function (slider) {

      self.slider = slider;

      slider.on('slideStop', function (slider) {
        params.activityModel.Filter.Participants(slider.value)
      });
    }

    // set the value of the participant slider when the browser is resizing
    $(window).on('resize', function (event) {
      if (self.slider !== null) {
        var value = params.activityModel.Filter.Participants();

        $(self.slider).slider('setValue', value);
      }
    });
  }

  // clean up event handlers
  ParticipantSlider.prototype.dispose = function () {
    $(window).off('resize');
    $(self.slider).off('slideStop');
  };

  return { viewModel: ParticipantSlider, template: templateMarkup };

});