define(function () {

  // store session information regarding accounts

  var tokenKey = 'accessToken';

  var authStorage = {};

  // stores an authentication access token into the session storage
  authStorage.StoreToken = function (accesToken) {
    sessionStorage.setItem(tokenKey, accesToken);

  };

  // retrieve the bearer token from brower session
  authStorage.GetToken = function () {
    return sessionStorage.getItem(tokenKey);
  };

  // clears the authentiocation access token from the session storage
  authStorage.RemoveToken = function () {

    if (sessionStorage.getItem(tokenKey) !== null) {
      sessionStorage.removeItem(tokenKey);
    }

  };

  return authStorage;

});