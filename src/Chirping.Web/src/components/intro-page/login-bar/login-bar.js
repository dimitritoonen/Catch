define(['knockout', 'text!./login-bar.html', 'services/auth-service', 'services/login-service'], function (ko, templateMarkup, auth, login) {

  function LoginBar(params) {
    
    var self = this;
    var container = params.container;

    container.header('Login');
    container.canCloseSelf(true);
    
    self.username = ko.observable();
    self.password = ko.observable();

    // auto-focus username textbox
    $('#username').focus();

    self.error = ko.observable();
    self.showErrorBox = ko.observable(false);

    var redirectToDashboard = function () {
      window.location.href = '#Workspace';
    };

    // display and hide the loading screen
    var toggleLoading = function () {
      $('#login-container').toggleClass('hide-visibility');
      $('#login-spinner').toggleClass('show-visibility');
      $('#login-spinner').toggleClass('hide');
    };

    // try to log in the user
    self.login = function () {

      toggleLoading();
      container.clearHeader();
      container.hideCloseButton();

      var data = {
        grant_type: 'password',
        username: self.username(),
        password: self.password()
      };

      login.LoginUser(data).done(function () {
        redirectToDashboard();
      }).error(function (data) {
        toggleLoading();

        var err = JSON.parse(data.responseText);
        self.error(err);
        self.showErrorBox(true);

        $('#username').focus();
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

        toggleLoading();
      } else if (user.isregisteredasexternal == 'False') {
        self.error({ error_description: 'email_already_used_internal' });
        self.showErrorBox(true);

        toggleLoading();
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

