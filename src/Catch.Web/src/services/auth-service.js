define(['jquery', 'auth-storage'], function ($, authStorage) {
  
  var accessToken = 'accessToken';

  // defines the entry points for the authentication with the back-end
  var authService = {
    
  };

  // 
  authService.loginUser = function (data) {

    $.ajax({
      type: 'POST',
      url: this.baseUrl + '/Token',
      data: data
    }).done(function (data) {
      authStorage.storeToken(data.access_token);
    });

  };


  return authService;

});