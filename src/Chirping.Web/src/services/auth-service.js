define(['jquery', './auth-storage', 'app/app.config'], function ($, authStorage, config) {

  // defines the entry points for the authentication with the back-end
  var authService = {

  };

  // checks if the e-mail address is available
  authService.IsEmailAddressAvailable = function (emailAddress, callback) {

    var queryString = '/?emailAddress=' + encodeURI(emailAddress);

    console.log(config.BaseUrl + 'api/Emails/EmailAddressAvailable' + queryString);

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


  var registerViaFaceBook = function (data) {

    return $.ajax({
      type: 'POST',
      url: config.BaseUrl + 'api/account/registerexternal',
      data: JSON.stringify(data)
    });

  };

  var registerViaEmail = function (data) {
    return $.ajax({
      type: 'POST',
      url: config.BaseUrl + 'api/Account/Register',
      data: JSON.stringify(data)
    });
  };


  // registers user in the back-end
  authService.RegisterUser = function (data, viaFacebook) {

    if (viaFacebook) {
      return registerViaFaceBook(data);
    } else {
      return registerViaEmail(data);
    }

  };

  // get an local access token when loggin in with an external provider
  authService.obtainAccessToken = function (externalData) {

    var data = { 
      provider: externalData.provider,
      externalAccessToken: externalData.externalAccessToken
    };

    return $.ajax({
      type: 'GET',
      url: config.BaseUrl + 'api/Account/ObtainLocalAccessToken',
      data: data
    }).success(function (data) {

      authStorage.storeToken({ token: data.access_token, userName: data.userName });

    }).error(function(err, status) {
      authService.logOut();
    });
  };

  // remove the session token and logout the user
  authService.logOut = function () {

    authStorage.removeToken();

  };

  return authService;

});