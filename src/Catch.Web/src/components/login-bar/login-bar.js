define(['knockout', 'text!./login-bar.html', 'services/auth-service'], function (ko, templateMarkup, auth) {

  function LoginBar(params) {
    
    var self = this;

    self.userName = ko.observable();
    self.password = ko.observable();


    self.login = function () {

      var data = {
        grant_type: 'password',
        username: self.userName(),
        password: self.password()
      };

      auth.LoginUser(data);
    };
  }
  
  return { viewModel: LoginBar, template: templateMarkup };

});
