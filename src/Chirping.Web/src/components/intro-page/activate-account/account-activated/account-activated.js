define(['knockout', 'text!./account-activated.html'], function (ko, templateMarkup) {

  function AccountActivated(params) {
  
    var self = this;
    var container = params.container;
    container.header('Hoooraahh!');
    container.canCloseSelf(true);

    self.loadLoginComponent = function () {
      container.updateActiveComponent('login-bar');
    };
  }
  
  return { viewModel: AccountActivated, template: templateMarkup };

});
