define(['knockout', 'text!./forgot-password.html'], function(ko, templateMarkup) {

  function ForgotPassword(params) {
    
    var self = this;
    var container = params.container;

    // display the 'forgot password' component
    self.showLoginComponent = function () {
      container.updateActiveComponent('login-bar');
    };

    self.showRegisterComponent = function () {
      container.updateActiveComponent('register');
    };
  }
  
  return { viewModel: ForgotPassword, template: templateMarkup };

});
