define(['jquery', './auth-storage', 'app/app.config'], function ($, authStorage, config) {
  
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


  // authenticate user via facebook provider
  authService.authFacebookUser = function (registration) {

    //var redirectUri = 'http://localhost:8080/authcomplete.html';
    var redirectUri = window.location.protocol + "//" + window.location.host + '/authcomplete.html';
    var externalProviderUrl = config.BaseUrl + '/api/Account/ExternalLogin?provider=Facebook' + '&response_type=token&client_id=ChirpingWeb&redirect_uri=' + redirectUri;

    window.$windowScope = registration;

    var oauthWindows = window.open(externalProviderUrl, "Authenticate Account", "location=0,status=0,width=750,height=600");
  };

  authService.registerExternal = function (registration) {
    
    //var deferred = $q.defer();

    //$http.post(serviceBase + 'api/account/registerexternal', registerExternalData).success(function (response) {

    //  localStorageService.set('authorizationData', { token: response.access_token, userName: response.userName, refreshToken: "", useRefreshTokens: false });

    //  _authentication.isAuth = true;
    //  _authentication.userName = response.userName;
    //  _authentication.useRefreshTokens = false;

    //  deferred.resolve(response);

    //}).error(function (err, status) {
    //  _logOut();
    //  deferred.reject(err);
    //});

    //return deferred.promise;

  };


  //
  authService.logOut = function (data) {

    authStorage.removeToken();

  };

  return authService;

});