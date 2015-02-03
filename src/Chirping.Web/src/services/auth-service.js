define(['jquery', './auth-storage', './webapi-service', 'app/app.config'], function ($, authStorage, webapi, config) {

  // defines the entry points for the authentication with the back-end
  var authService = {

  };

  // checks if the e-mail address is available
  authService.IsEmailAddressAvailable = function (emailAddress, callback) {

    var queryString = '/?emailAddress=' + encodeURI(emailAddress);

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

      authStorage.StoreToken({ token: data.access_token, userName: data.userName });

    }).error(function(err, status) {
      authService.logOut();
    });
  };


  // checks if the users bearer token is present
  authService.IsUserAuthenticated = function () {
        
    var url = 'api/Account/IsUserAuthenticated';

    var isAuthenticated = false;
    
    return webapi.Get(url);
  };

  // remove the session token and logout the user
  authService.LogOut = function () {

    authStorage.RemoveToken();

    window.location.href = '#' + config.HOMEPAGE;
  };

  return authService;

});