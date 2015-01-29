define(['knockout', 'bootstrap-dialog', 'text!./wizard-step2.html', 'jcrop'], function (ko, bootstrapDialog, templateMarkup) {

  function WizardStep2(params) {

    var self = this;

    self.registration = params.registration;
    
    self.CurrentGenderIcon = ko.computed(function () {
      return 'gender-' + self.registration.gender() + '-icon';
    });

    self.CurrentInterestedInIcon = ko.computed(function () {
      return 'gender-' + self.registration.interestedIn() + '-icon';
    });

    var validationGroup = ko.validatedObservable({
      nickName: self.registration.nickName,
      city: self.registration.city,
      age: self.registration.age
    });

    // checks if wizard step2 is valid upon loading (which indicates that the previous step button 
    // is used), and if so ensures that all controls are shown as valid (i.e. green ok)
    if (validationGroup.isValid()) {
      params.registration.isCurrentStepValid(validationGroup.isValid());
      params.registration.validateStep2();
    } else {
      params.registration.isCurrentStepValid(false);
    }

    // indicate to the registration-model that all controls are valid
    validationGroup.isValid.subscribe(function (valid) {
      params.registration.isCurrentStepValid(valid);
      params.registration.isStep2Valid(valid);
    });
  }

  return { viewModel: WizardStep2, template: templateMarkup };

});
