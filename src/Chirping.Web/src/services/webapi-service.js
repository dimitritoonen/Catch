define(['jquery', './auth-storage', 'app/app.config'], function ($, authStorage, config) {

  // defines the default communication to the backend (web-api)
  var apiService = {};

  // returns the result of an jquery ajax GET result
  apiService.Get = function (url, data) {

    var headers = GetHeaders();
    
    return $.ajax({
      type: 'GET',
      url: config.BaseUrl + url,
      data: data,
      headers: headers
    });
  };

  // returns the result of an jquery ajax POST result
  apiService.Post = function (url, data) {

    var headers = GetHeaders();

    return $.ajax({
      type: 'POST',
      url: config.BaseUrl + url,
      data: JSON.stringify(data),
      headers: headers
    });

  };

  function GetHeaders() {
    var token = authStorage.GetToken();
    var headers = {};

    if (token) {
      headers.Authorization = 'Bearer ' + token;
    }

    return headers;
  }

  return apiService;

});