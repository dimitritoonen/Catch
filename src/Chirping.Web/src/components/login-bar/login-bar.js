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
      $('#login-container').toggleClass('hide-visibility');
      $('#login-spinner').toggleClass('show-visibility');
      $('#login-spinner').toggleClass('hide');
    };

    // try to log in the user
    self.login = function () {

      toggleLoading();

      var data = {
        grant_type: 'password',
        username: self.username(),
        password: self.password()
      };

      login.LoginUser(data).done(function () {
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

