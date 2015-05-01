define(['knockout', 'text!./participant-slider.html', 'bindingHandlers/slider'], function (ko, templateMarkup) {

  function ParticipantSlider(params) {

    var self = this;

    self.slider;
    self.minValue = ko.observable(1);
    self.participantSelection = params.value;
    self.showLabel = ko.observable(true);

    self.disposables = [];

    // change the slider if the observable changes
    self.disposables.push(self.participantSelection.subscribe(function (value) {
      $(self.slider).slider('setValue', value);
    }));

    if (params.showLabel !== undefined) {
      self.showLabel(params.showLabel);
    }

    if (params.minValue !== undefined) {
      self.minValue(params.minValue);
    }

    // gets the element upon slider initialization
    self.onSliderInit = function (slider) {

      self.slider = slider;

      slider.on('slideStop', function (slider) {
        self.participantSelection(slider.value);
      });
    }

    // set the value of the participant slider when the browser is resizing
    $(window).on('resize', self.resizer);

    self.resizer = function (event) {
      if (self.slider !== null) {
        $(self.slider).slider('setValue', self.participantSelection());
      }
    }
  }

  // clean up event handlers
  ParticipantSlider.prototype.dispose = function () {
    $(window).off('resize', this.resizer);
    $(self.slider).off('slideStop');

    // clear all subscriptions
    ko.utils.arrayForEach(this.disposables, function (item) {
      item.dispose();
    });
  };

  return { viewModel: ParticipantSlider, template: templateMarkup };

});