define(['jquery', 'knockout', 'text!./wizard-step1.html', 'services/auth-service', 'app/app.config'], function($, ko, templateMarkup, auth, config) {

  function WizardStep1(params) {

    var self = this;

    self.result = ko.observable();
    self.emailAddress = ko.observable('dimitritoonen@gmail.co');
    self.password = ko.observable('Password1!');
    self.isValid = false;
      

    self.SetValidation = function (control, isValid) {

      $(control).addClass('has-error');
    };

    // check if email is already in use
    self.emailAddress.subscribe(function (emailAddress) {
      
      var queryString = '/?emailAddress=' + encodeURI(emailAddress)

      $.ajax({
        type: 'GET',
        url: config.BaseUrl + 'api/Emails/EmailAddressAvailable' + queryString
      }).done(function (data) {
        
        // display result on control
        self.SetValidation($('#emailAddressHeader'), data);

      });

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
  }
  
  return { viewModel: WizardStep1, template: templateMarkup };

});
