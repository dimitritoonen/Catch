define(['knockout', 'text!./wizard-step1.html'], function(ko, templateMarkup) {

  function WizardStep1(params) {

    var self = this;

    var tokenKey = 'accessToken';
    self.result = ko.observable();

    self.emailAddress = ko.observable('dimitritoonen@gmail.com');
    self.password = ko.observable('Password1!');

    self.isValid = false;

    self.isValidEmail = function (emailAddress) {

      $.getJSON('http://localhost:4421/api/emails?emailAddress=' + emailAddress, function (data) {
        console.log(data);
      });

    };


    function showError(jqXHR) {
      self.result(jqXHR.status + ': ' + jqXHR.statusText);
    }

    this.registerUser = function () {

      var data = {
        Email: self.emailAddress(),
        Password: self.password(),
        ConfirmPassword: self.password()
      };
      
      $.ajax({
        type: 'POST',
        url: 'http://localhost:4421/api/Account/Register',
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(data)
      }).done(function (data) {
        self.result("Done!");
      }).fail(showError);
    };

    this.callApi = function () {

      // If we already have a bearer token, set the Authorization header.
      var token = sessionStorage.getItem(tokenKey);
      var headers = {};
      if (token) {
        headers.Authorization = 'Bearer ' + token;
      }

      $.ajax({
        type: 'GET',
        url: 'http://localhost:4421/api/values/1',
        headers: headers
      }).done(function (data) {
        self.result(data);
      }).fail(showError);

    };


    // check if email is already in use
    self.emailAddress.subscribe(function (emailAddress) {

      if (!self.isValidEmail(emailAddress)) {
        //
      }

      // ajax request

    });
  }
  
  return { viewModel: WizardStep1, template: templateMarkup };

});
