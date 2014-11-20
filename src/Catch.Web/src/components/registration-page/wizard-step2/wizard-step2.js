define(['knockout', 'text!./wizard-step2.html'], function(ko, templateMarkup) {

  function WizardStep2(params) {
    
    // constants
    var genderMaleIcon = 'gender-male-icon';
    var genderFemaleIcon = 'gender-female-icon';
    var genderBothIcon = 'gender-both-icon';

    var self = this;

    self.registration = params.registration;
    
    self.CurrentGenderIcon = ko.computed(function () {
      return (self.registration.gender() == 'Male' ? genderMaleIcon : genderFemaleIcon);
    })

    self.CurrentInterestedInIcon = ko.computed(function () {
      return (self.registration.interestedIn() == 'Male' ? genderMaleIcon : genderFemaleIcon);
    });

    var validationGroup = ko.validatedObservable({
      nickName: self.registration.nickName,
      city: self.registration.city,
      age: self.registration.age
    })

    // checks if wizard step2 is valid upon loading (which indicates that the previous step button 
    // is used), and if so ensures that all controls are shown as valid (i.e. green ok)
    if (validationGroup.isValid()) {
      params.registration.isCurrentStepValid(validationGroup.isValid());
      params.registration.validateStep2();
    } else {
      params.registration.isCurrentStepValid(false);
    };

    // indicate to the registration-model that all controls are valid
    validationGroup.isValid.subscribe(function (valid) {
      params.registration.isCurrentStepValid(valid);
      params.registration.isStep2Valid(valid);
    });


    self.openFileDialog = function () {
      $('#wizard-profileFile1').trigger('click');
    };
  }

  return { viewModel: WizardStep2, template: templateMarkup };

});
