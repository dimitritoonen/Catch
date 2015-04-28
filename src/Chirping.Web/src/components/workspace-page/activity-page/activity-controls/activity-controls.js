define(['knockout', 'text!./activity-controls.html', 'viewport'], function (ko, templateMarkup, viewport) {

  function ActivityControls(params) {

    var miliseconds = 10;
    var self = this;

    self.id = params.id;
    self.categories = params.categories;
    self.activityModel = params.activityModel;

    self.showLargeButtons = ko.observable(viewport.is.largerThan('ms'));

    self.disposables = [];
    self.disposables.push(viewport.currentViewpoint.subscribe(function (value) {
      self.showLargeButtons(viewport.is.largerThan('ms'));
    }));
  }
  
  // cleans up events
  ActivityControls.prototype.dispose = function () {
    ko.utils.arrayForEach(this.disposables, function (item) {
      item.dispose();
    });
  }

  return { viewModel: ActivityControls, template: templateMarkup };

});
