define(['app/app.config', 'services/auth-service', './auth-storage'], function (config, auth, authStorage) {

  var loginService = {};

  loginService.loginCallback = null;

  // login user with e-mail and password
  loginService.LoginUser = function (loginData) {

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


  // authenticate user via an external provider
  loginService.authExternalProvider = function (provider, callback) {
    
    var redirectUri = window.location.protocol + "//" + window.location.host + '/authcomplete.html';
    var externalProviderUrl = config.BaseUrl + 'api/Account/ExternalLogin?provider=' + provider +
                                               '&response_type=token&client_id=ChirpingWeb&redirect_uri=' + redirectUri;

    window.$windowScope = loginService;
    loginService.loginCallback = callback;

    //var window = window.open(externalProviderUrl, "Authenticate Account", "location=0,status=0,width=750,height=600");
    var win = window.open(externalProviderUrl, "_blank");
    win.focus();
  };

  // complete the authentication after the logon of the external provider
  loginService.authCompletedCB = function (fragment) {
    
    if (fragment.haslocalaccount == 'False' || fragment.isregisteredasexternal == 'False') {
      auth.logOut();
    } else {
      var externalData = { provider: fragment.provider, externalAccessToken: fragment.external_access_token };
      auth.obtainAccessToken(externalData).then(function () {

        alert('Redirect to dashboard');

      });
    }

    // callback the caller with the fragment
    loginService.loginCallback(fragment);
  };

  return loginService;

});
