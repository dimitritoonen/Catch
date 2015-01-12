define(['knockout', 'text!./login-bar.html', 'services/auth-service'], function (ko, templateMarkup, auth) {

  function LoginBar(params) {
    
    var self = this;
    var container = params.container;
    
    self.username = ko.observable();
    self.password = ko.observable();

    // try to log in the user
    self.login = function () {

      var data = {
        grant_type: 'password',
        username: self.username(),
        password: self.password()
      };

      auth.LoginUser(data);
    };
      
    // display the 'forgot password' component
    self.showForgotPasswordComponent = function () {
      container.updateActiveComponent('forgot-password');
    };
  }
  
  return { viewModel: LoginBar, template: templateMarkup };

});
