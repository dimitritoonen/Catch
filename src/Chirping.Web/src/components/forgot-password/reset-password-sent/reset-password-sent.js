define(['knockout', 'text!./reset-password-sent.html'], function (ko, templateMarkup) {

  // display's the message to the user that the password reset e-mail will be sent

  function ResetPasswordSent(params) {
   
    var self = this;
    var container = params.container;

    self.closeContainer = function () {
      container.closeSelf();
    };
  }

  return { viewModel: ResetPasswordSent, template: templateMarkup };

});
