define(['knockout', 'text!./activity-add-location.html', '../add-activity-wizard', 'models/add-activity-model'], function (ko, templateMarkup, wizard, model) {

  function ActivityAddLocation(params) {
    
    wizard.arePreviousStepsValid(4);

    var self = this;

    // auto-focus location textbox
    $('#locationTextbox').focus();

    self.model = model;
    wizard.currentStep(4); // set step (also used when hitting the back button)

    // disables/enabled the Next button
    var toggleNextButton = function (toggle) {
      if (toggle) {
        $('#addActivityButton').removeAttr('disabled');
      } else {
        $('#addActivityButton').attr('disabled', 'disabled');
      }
    }

    // disable/enable the button upon load
    toggleNextButton(model.location.isValid());

    // disable/enable the add-button while entering the location
    $('#locationTextbox').on('keyup', function (key) {
      var isLocationEmpty = ($('#locationTextbox').val() !== '');
      toggleNextButton(isLocationEmpty);
    });

    self.saveActivity = function () {
      if (!self.model.location.isValid()) {
        return;
      }

      // add activity and redirect to activity list
      model.addActivity();

      redirectToActivitiesList();
    }

    var redirectToActivitiesList = function () {
      // reset the wizard
      wizard.reset();

      // redirect after activity creation
      window.location.href = '#Workspace/Activities';
    }
  }

  ActivityAddLocation.prototype.dispose = function () {
    model.dispose();
  }
  
  return { viewModel: ActivityAddLocation, template: templateMarkup };

});
