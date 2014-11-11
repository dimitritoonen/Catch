define(['knockout', 'text!./wizard-step2.html'], function(ko, templateMarkup) {

  function WizardStep2(params) {
    
    // constants
    var genderMaleIcon = 'gender-male-icon';
    var genderFemaleIcon = 'gender-female-icon';
    var genderBothIcon = 'gender-both-icon';

    var self = this;
    
    self.CurrentGender = ko.observable('Male');
    self.CurrentInterestedIn = ko.observable('Female');

    self.CurrentGenderIcon = ko.computed(function () {
      return (self.CurrentGender() == 'Male' ? genderMaleIcon : genderFemaleIcon);
    })

    self.CurrentInterestedInIcon = ko.computed(function () {
      return (self.CurrentInterestedIn() == 'Male' ? genderMaleIcon : genderFemaleIcon);
    });
  }

  return { viewModel: WizardStep2, template: templateMarkup };

});
