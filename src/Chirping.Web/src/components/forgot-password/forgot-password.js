define(['knockout', 'text!./forgot-password.html'], function(ko, templateMarkup) {

  function ForgotPassword(params) {
    this.message = ko.observable('Hello from the forgot-password component!');
  }

  // This runs when the component is torn down. Put here any logic necessary to clean up,
  // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
  ForgotPassword.prototype.dispose = function() { };
  
  return { viewModel: ForgotPassword, template: templateMarkup };

});
