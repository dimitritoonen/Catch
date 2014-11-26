define(function () {

  // store session information regarding accounts

  var tokenKey = 'accessToken';

  var authStorage = {};

  // stores an authentication access token into the session storage
  authStorage.storeToken = function (accesToken) {

    sessionStorage.setItem(tokenKey, accesToken);

  };

  // clears the authentiocation access token from the session storage
  authStorage.removeToken = function () {

    if (sessionStorage.getItem(tokenKey) != null) {
      sessionStorage.removeItem(tokenKey);
    }

  };

  return authStorage;

});