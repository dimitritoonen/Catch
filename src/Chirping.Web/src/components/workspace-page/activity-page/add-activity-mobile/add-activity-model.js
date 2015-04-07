define(['knockout', 'viewport', 'services/webapi-service'], function (ko, viewport, webapi) {
  
  function AddActivityModel() {

    var self = this;

    var steps = {
      1: { url: '#Workspace/Activities/Add' },
      2: { url: '#Workspace/Activities/Add/Description' },
      3: { url: '#Workspace/Activities/Add/Participants' },
      4: { url: '#Workspace/Activities/Add/Location' },
    }

    self.categories = ko.observableArray([]);
    self.currentStep = ko.observable(1);
    self.shouldShow = ko.observable(viewport.is.smallerThan('sm'));

    self.currentStep.subscribe(function (step) {
      console.log(steps[step].url);
    });

    // fields
    self.category = ko.observable();
    self.description = ko.observable();
    self.location = ko.observable();
    self.date = ko.observable('Select Date');
    self.time = ko.observable('Select Time');
    self.participants = ko.observable(8);

        
    if (self.categories().length === 0) {
      webapi.Get('api/category').done(function (result) {
        self.categories(result);
      });
    }

    // advances to the next step
    self.nextStep = function () {
      if (self.currentStep() === steps.length)
        return;

      var nextStep = self.currentStep() + 1;
      window.location.href = steps[nextStep].url;
    }

    // goes a step back
    self.previousStep = function () {
      if (self.currentStep() === 1)
        return;

      self.currentStep(self.currentStep() - 1);
    };
  }

  return new AddActivityModel();

})