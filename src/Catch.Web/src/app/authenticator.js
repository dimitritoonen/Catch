/**/
define(['jquery'], function ($) {

  var authenticator = {

    accessToken: 'accessToken',
    baseUrl: 'http://localhost:4421',
    result: 'sfdsfds',

    loginUser: function (data) {  

      $.ajax({
        type: 'POST',
        url: this.baseUrl + '/Token',
        data: data
      }).done(function (data) {
        sessionStorage.setItem(this.tokenKey, data.access_token);
      }); //.fail(showError);

    },

    registerUser: function (data) {
      
      $.ajax({
        type: 'POST',
        url: this.baseUrl + '/api/Account/Register',
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(data)
      }).done(function (data) {
        self.result("Done!");
      }); //.fail(showError);

    },

    callApi: function () {

      // If we already have a bearer token, set the Authorization header.
      var token = sessionStorage.getItem(this.tokenKey);
      var headers = {};
      if (token) {
        headers.Authorization = 'Bearer ' + token;
      }

      $.ajax({
        type: 'GET',
        url: this.baseUrl + '/api/values/1',
        headers: headers
      }).done(function (data) {
        this.result(data);
      }); //.fail(showError);
    }

  };

  return authenticator;

});