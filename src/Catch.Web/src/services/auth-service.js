define(['jquery', './auth-storage', 'app/app.config'], function ($, authStorage, config) {
  
  // defines the entry points for the authentication with the back-end
  var authService = {
    
  };

  // checks if the e-mail address is available
  authService.IsEmailAddressAvailable = function (emailAddress, callback) {

    var queryString = '/?emailAddress=' + encodeURI(emailAddress)

    $.ajax({
      type: 'GET',
      url: config.BaseUrl + 'api/Emails/EmailAddressAvailable' + queryString
    }).done(function (data) {
      callback(data);
    });
  };

  // checks if the nickname is available
  authService.IsNickNameAvailable = function (nickname, callback) {

    var queryString = '/?nickname=' + encodeURI(nickname);

    $.ajax({
      type: 'GET',
      url: config.BaseUrl + 'api/Users/NickNameAvailable' + queryString
    }).done(function (data) {
      callback(data);
    });
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
    
    console.log(data);

    return $.ajax({
      type: 'POST',
      url: config.BaseUrl + 'api/Account/Register',
      data: JSON.stringify(data)
    });

  };


  //
  authService.RegisterExternal = function (data) {

  };


  //
  authService.logOut = function (data) {

    authStorage.removeToken();

  };

  return authService;

});