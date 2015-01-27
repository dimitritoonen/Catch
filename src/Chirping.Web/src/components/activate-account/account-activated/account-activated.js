define(['knockout', 'text!./account-activated.html'], function (ko, templateMarkup) {

  function AccountActivated(params) {
  
    var self = this;
    var container = params.container;

    self.loadLoginComponent = function () {
      container.updateActiveComponent('login-bar');
    }
  }
  
  return { viewModel: AccountActivated, template: templateMarkup };

});
