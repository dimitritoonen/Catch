define(['knockout', 'text!./success-message.html'], function(ko, templateMarkup) {

  // display's the message to the user that the password reset e-mail will be sent

  function ForgotPasswordSent(params) {
   
    var self = this;
    var container = params.container;

    self.closeContainer = function () {
      container.closeSelf();
    };
  }

  return { viewModel: ForgotPasswordSent, template: templateMarkup };

});
