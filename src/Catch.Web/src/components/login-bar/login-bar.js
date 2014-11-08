define(['knockout', 'text!./login-bar.html'], function(ko, templateMarkup) {

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
        
      $.ajax({
        type: 'POST',
        url: 'http://localhost:4421/Token',
        data: data
      }).done(function (data) {
          sessionStorage.setItem(tokenKey, data.access_token);
        }).fail(showError);

    };
  }
  
  return { viewModel: LoginBar, template: templateMarkup };

});
