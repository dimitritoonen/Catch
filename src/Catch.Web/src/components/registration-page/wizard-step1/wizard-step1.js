define(['jquery', 'knockout', 'text!./wizard-step1.html', 'app/app.config'], function ($, ko, templateMarkup, auth, config) {

  function WizardStep1(params) {
    
    var self = this;
    
    self.result = ko.observable();
    self.emailAddress = params.registration.emailAddress;
    self.confirmEmail = params.registration.confirmEmail;
    self.password = params.registration.password;
    
    var validationGroup = ko.validatedObservable({
      emailAddress: self.emailAddress,
      confirmEmail: self.confirmEmail,
      password: self.password
    });

    validationGroup.isValid.subscribe(function (valid) {
      params.registration.isCurrentStepValid(valid);
    });






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

      auth.RegisterUser(data).done(function (data) {
        self.result("Done!");
      });
    };

    this.registerViaFacebook = function () {

      var redirectUri = 'http://localhost:8080';
      var externalProviderUrl = 'http://localhost:4421/api/Account/ExternalLogin?provider=Facebook'
                              + '&response_type=token&client_id=ChirpingWeb&redirect_uri=' + redirectUri;

      var oauthWindows = window.open(externalProviderUrl, "Authenticate Account", "location=0,status=0,width=600,height=750");
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
  }
  
  return { viewModel: WizardStep1, template: templateMarkup };

});
