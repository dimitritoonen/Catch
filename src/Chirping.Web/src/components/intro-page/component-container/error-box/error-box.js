define(['knockout', 'text!./error-box.html'], function(ko, templateMarkup) {

  function ErrorBox(params) {
    var self = this;

    self.errorTitle = ko.observable();
    self.errorDescription = ko.observable();
    
    params.error.subscribe(function (error) {
      defineErrorText(error.error_description);
    });

    // define the error message that should be shown if an error occures when loggin in
    var defineErrorText = function (desc) {
      if (desc === 'incorrect_email') {
        self.errorTitle('Incorrect e-mail address');
        self.errorDescription('The e-mail address you entered is not in a correct format. Please provide a proper e-mail address.');
      } else if (desc === 'email_not_registered') {
        self.errorTitle('User not registered');
        self.errorDescription('The e-mail address you entered is not registered.');
      } else if (desc === 'incorrect_password') {
        self.errorTitle('Incorrect password');
        self.errorDescription('The password you entered is incorrect<br />(Check if Caps lock is not enabled). Please try again.');
      } else if (desc === 'facebook_notregistered') {
        self.errorTitle('Facebook user not registered');
        self.errorDescription('The facebook account your are trying to log on with is not yet registered.');
      } else if (desc === 'email_already_used_internal') {
        self.errorTitle('E-mail address already used');
        self.errorDescription('Your Facebook e-mail is already registered with a password.');
      } else {
        self.errorTitle('Incorrect email address or password ');
        self.errorDescription('The email you entered does not belong to any account or your password is incorrect.');
      }
    };
  }
  
  return { viewModel: ErrorBox, template: templateMarkup };

});
