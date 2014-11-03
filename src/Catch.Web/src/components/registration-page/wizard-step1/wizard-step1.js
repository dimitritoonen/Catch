define(['knockout', 'text!./wizard-step1.html'], function(ko, templateMarkup) {

  function WizardStep1(params) {

    var self = this;

    self.emailAddress = ko.observable();
    self.password = ko.observable();

    self.isValid = false;

    self.isValidEmail = function (emailAddress) {

      $.getJSON('http://localhost:4421/api/emails?emailAddress=' + emailAddress, function (data) {
        console.log(data);
      });

    };

    // check if email is already in use
    self.emailAddress.subscribe(function (emailAddress) {

      if (!self.isValidEmail(emailAddress)) {
        //
      }

      // ajax request

    });
  }
  
  return { viewModel: WizardStep1, template: templateMarkup };

});
