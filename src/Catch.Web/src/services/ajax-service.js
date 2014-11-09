define(['jquery'], function ($) {

  var baseUrl = 'http://localhost:4421/';

  var ajaxHelper = {
  };

  ajaxHelper.Get = function (url, data) {

    return $.ajax({
      type: 'GET',
      url: baseUrl + url,
      data: data
    });
  };

  return ajaxHelper;

});