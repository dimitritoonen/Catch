define(['knockout', 'text!./login-bar.html', 'services/auth-service'], function (ko, templateMarkup, auth) {

  function LoginBar(params) {
    
    var self = this;

    self.userName = ko.observable('dimitritoonen@gmail.com');
    self.password = ko.observable('Password1!');

    var tokenKey = "accessToken";

    self.result = ko.observable();

    function showError(jqXHR) {
      self.result(jqXHR.status + ': ' + jqXHR.statusText);
    }

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
