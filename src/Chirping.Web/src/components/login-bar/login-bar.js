define(['knockout', 'text!./login-bar.html', 'services/auth-service', 'services/login-service'], function (ko, templateMarkup, auth, login) {

  function LoginBar(params) {
    
    var self = this;
    var container = params.container;
    
    self.username = ko.observable();
    self.password = ko.observable();

    self.error = ko.observable();
    self.showErrorBox = ko.observable(false);


    // display and hide the loading screen
    var toggleLoading = function () {
      $('#loginScreen').toggleClass('hide-visibility');
      $('#loginSpinner').toggleClass('show-visibility');
      $('#loginSpinner').toggleClass('hide');
    };

    

    // automatically try to log on the user when pressing the [Enter] key
    var submitForm = function (event) {
      if (event.keyCode == 13) {
        self.login();
      }
    };

    // bind keyup event to submitForm function
    $('#username').keyup(function (event) { submitForm(event); });
    $('#password').keyup(function (event) { submitForm(event); });
    
    // try to log in the user
    self.login = function () {

      toggleLoading();

      var data = {
        grant_type: 'password',
        username: self.username(),
        password: self.password()
      };

      auth.LoginUser(data).done(function () {
        alert('open dashboard!');
      }).error(function (data) {
        toggleLoading();

        var err = JSON.parse(data.responseText);
        self.error(err);
        self.showErrorBox(true);
      });
    };


    // logon to facebook
    self.logonToFacebook = function () {
      toggleLoading();

      login.authExternalProvider('Facebook', self.facebookLogonCallback);
    };


    // executed after successfully logged on to facebook
    self.facebookLogonCallback = function (user) {
      if (user.haslocalaccount == 'False') {
        toggleLoading();

        self.error({ error_description: 'facebook_notregistered' });
        self.showErrorBox(true);
      }
    };
       
    // display the 'forgot password' component
    self.showForgotPasswordComponent = function () {
      container.updateActiveComponent('forgot-password');
    };


    // get the error box component
    self.getErrorBox = function () {
      return {
        name: 'error-box',
        params: {
          error: self.error
        }
      };
    };
  }
  
  return { viewModel: LoginBar, template: templateMarkup };

});

