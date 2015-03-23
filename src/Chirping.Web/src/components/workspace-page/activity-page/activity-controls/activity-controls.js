define(['knockout', 'text!./activity-controls.html', 'viewport'], function (ko, templateMarkup, viewport) {

  function ActivityControls(params) {

    var miliseconds = 10;
    var self = this;
    
    self.categories = params.categories;
    self.activityModel = params.activityModel;
    
    self.showLargeButtons = ko.observable(viewport.is.largerThan('ms'));

    $(window).on('resize', function () {
      viewport.changed(function () {

        var showButton = viewport.is.largerThan('ms');

        self.showLargeButtons(showButton);
      })
    });
  }
  
  // cleans up events
  ActivityControls.prototype.dispose = function () {
    $(window).off('resize');
  }

  return { viewModel: ActivityControls, template: templateMarkup };

});
