define(['knockout', 'text!./login-bar.html', 'services/auth-service'], function (ko, templateMarkup, auth) {

  function LoginBar(params) {
    
    var self = this;
    var container = params.container;
    
    self.username = ko.observable('dimitritoonen@gmail.com');
    self.password = ko.observable('dimitritoonen@gmail.com');

    self.errorTitle = ko.observable();
    self.errorDescription = ko.observable();

    // display and hide the loading screen
    var toggleLoading = function () {
      $('#loginScreen').toggleClass('hide-visibility');
      $('#loginSpinner').toggleClass('show-visibility');
      $('#loginSpinner').toggleClass('hide');
    };

    var showErrorMessage = function () {
      $('#error-message-container').removeClass('hide');
    };
    
    var displayErrorMessage = function(err) {
      defineErrorText(err.error_description);

      showErrorMessage();
    };

    // define the error message that should be shown if an error occures when loggin in
    var defineErrorText = function (desc) {
      console.log(desc);
      if (desc === 'incorrect_email') {
        self.errorTitle('Incorrect e-mail address');
        self.errorDescription('The e-mail address you entered is not in a correct format. Please provide a proper e-mail address.');
      } else if (desc === 'email_not_registered') {
        self.errorTitle('User not registered');
        self.errorDescription('The e-mail address you entered is not registered.');
      } else if (desc === 'incorrect_password') {
        self.errorTitle('Incorrect password');
        self.errorDescription('The password you entered is incorrect<br />(Check if Caps lock is not enabled). Please try again.');
      } else {
        self.errorTitle('Incorrect email address or password ');
        self.errorDescription('The email you entered does not belong to any account or your password is incorrect.');
      }
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

        console.log(data);

        var err = JSON.parse(data.responseText);
        displayErrorMessage(err);
      });
    };
       
    // display the 'forgot password' component
    self.showForgotPasswordComponent = function () {
      container.updateActiveComponent('forgot-password');
    };
  }
  
  return { viewModel: LoginBar, template: templateMarkup };

});

