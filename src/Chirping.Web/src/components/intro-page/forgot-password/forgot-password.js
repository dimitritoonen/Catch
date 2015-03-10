define(['knockout', 'text!./forgot-password.html', 'services/webapi-service'], function (ko, templateMarkup, webapi) {

  function ForgotPassword(params) {
    
    var self = this;

    var container = params.container;
    container.header('Reset password');
    container.canCloseSelf(true);

    // email address to reset
    self.EmailAddress = ko.observable().extend({
      required: true,
      email: true
    });

    // auto-focus on the e-mail textbox
    $('#emailAddress').focus();


    // if email address is valid, send the reset password email
    self.SendResetPasswordLink = function () {

      validateObservable(self.EmailAddress);

      if (self.EmailAddress.isValid()) {
        SendLink();
      }
    };

    // send the reset password link
    var SendLink = function () {
      var data = {
        Email: self.EmailAddress()
      };

      webapi.Post('api/Account/ForgotPassword', data);

      self.showSuccessMessage();
    };

    // toggles the modified property of the observable. This causes the knockout validation to re-initialize again.
    function validateObservable(observable) {
      observable.isModified(false);
      observable.isModified(true);
    }

    // display the 'forgot password' component
    self.showLoginComponent = function () {
      container.updateActiveComponent('login-bar');
    };

    // dispaly the 'register' component
    self.showRegisterComponent = function () {
      container.updateActiveComponent('register');
    };

    // display the confirmation that the password reset mail has been sent
    self.showSuccessMessage = function () {
      container.updateActiveComponent('reset-password-sent');
    };
  }
  
  return { viewModel: ForgotPassword, template: templateMarkup };

});
