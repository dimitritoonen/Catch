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
        NickName: 'Dimitri',
        Email: self.emailAddress(),
        ConfirmEmail: self.emailAddress(),
        Password: self.password(),
        Age: '25 - 35',
        InterestedIn: 'Female'
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

    this.registerViaFacebook = function () {
      /*
        var redirectUri = location.protocol + '//' + location.host + '/authcomplete.html';

        var externalProviderUrl = ngAuthSettings.apiServiceBaseUri + "api/Account/ExternalLogin?provider=" + provider
                                                                    + "&response_type=token&client_id=" + ngAuthSettings.clientId
                                                                    + "&redirect_uri=" + redirectUri;
        window.$windowScope = $scope;

        var oauthWindow = window.open(externalProviderUrl, "Authenticate Account", "location=0,status=0,width=600,height=750");
      */

      var redirectUri = 'http://localhost:8080';
      var externalProviderUrl = 'http://localhost:4421/api/Account/ExternalLogin?provider=Facebook'
                              + '&response_type=token&client_id=ChirpingWeb&redirect_uri=' + redirectUri;

      var oauthWindows = window.open(externalProviderUrl, "Authenticate Account", "location=0,status=0,width=600,height=750");
    }

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


    this.logOut = function () {

      sessionStorage.removeItem(tokenKey);

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
