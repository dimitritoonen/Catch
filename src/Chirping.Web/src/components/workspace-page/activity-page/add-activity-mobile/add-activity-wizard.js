define(['knockout', 'viewport', 'services/webapi-service'], function (ko, viewport, webapi) {
  
  function AddActivityModel() {

    var self = this;

    var steps = {
      1: { url: '#Workspace/Activities/Add', valid: false },
      2: { url: '#Workspace/Activities/Add/Description', valid: false },
      3: { url: '#Workspace/Activities/Add/Participants', valid: false },
      4: { url: '#Workspace/Activities/Add/Location', valid: false },
    }

    self.currentStep = ko.observable(1);

    // advances to the next step
    self.nextStep = function () {
      if (self.currentStep() === steps.length)
        return;

      // set the current step to valid when advancing to the next step
      steps[self.currentStep()].valid = true;

      var nextStep = self.currentStep() + 1;
      window.location.href = steps[nextStep].url;
    }

    // goes a step back
    self.previousStep = function () {
      if (self.currentStep() === 1)
        return;

      self.currentStep(self.currentStep() - 1);
    };

    // resets the wizard to it's initial state
    self.reset = function () {

      self.currentStep(1);
      
      // reset all steps
      for (var i = 1; i < Object.keys(steps).length; i++) {
        steps[i].valid = false;
      }
    }

    // checks if one of the previous steps are not valid, if so, then redirect to step 1
    self.arePreviousStepsValid = function (currentStep) {
      for (var i = 1; i < currentStep; i++) {
        if (steps[i].valid === false) {
          window.location.href = steps[1].url;
        }
      }
    };

  };

  return new AddActivityModel();
  
})