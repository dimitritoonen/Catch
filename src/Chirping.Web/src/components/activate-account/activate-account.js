define(['knockout', 'text!./activate-account.html', 'services/webapi-service'], function(ko, templateMarkup, webapi) {

  function ActivateAccount(params) {
    
    var self = this;

    self.showErrorBox = ko.observable(false);
    self.errorTitle = ko.observable();
    self.errorDescription = ko.observable();

    // the container contains the querystring
    var querystring = params.container.querystring;

    var url = 'api/Account/ConfirmEmail';
    var data = {
      UserId: querystring.userId,
      Code: querystring.confirmCode
    };

    // activate the account by confirming the userId and Code
    webapi.Post(url, data).done(function (result) {
      params.container.updateActiveComponent('account-activated');
    }).error(function (result) {
      
      toggleError();

      self.errorTitle(result.statusText);
      self.errorDescription(result.responseText);
    });

    var toggleError = function() { 
      self.showErrorBox(true);
      $('#spinner').toggleClass('hide');
    }

  }
  
  return { viewModel: ActivateAccount, template: templateMarkup };

});
