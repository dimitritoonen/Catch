define(['jquery', './auth-storage', 'app/app.config'], function ($, authStorage, config) {
  
  // defines the entry points for the authentication with the back-end
  var authService = {
    
  };

  // 
  authService.LoginUser = function (loginData) {

    // map login data to a querystring
    var data = 'grant_type=password&username=' + loginData.username + '&password=' + loginData.password + '&client_id=ChirpingWeb';
    
    return $.ajax({
      type: 'POST',
      url: config.BaseUrl + 'token',
      data: loginData,
      contentType: 'application/x-www-form-urlencoded'
    }).done(function (data) {
      authStorage.storeToken(data.access_token);
    });

  };


  //
  authService.RegisterUser = function (data) {
    
    return $.ajax({
      type: 'POST',
      url: config.BaseUrl + 'api/Account/Register',
      data: JSON.stringify(data)
    });

  };


  //
  authService.RegisterExternal = function (data) {

  };



  authService.isValidEmail = function (emailAddress) {

    //

  };


  //
  authService.logOut = function (data) {

    authStorage.removeToken();

  };

  return authService;

});