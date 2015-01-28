define(['knockout', 'text!./password-changed.html'], function(ko, templateMarkup) {

  function PasswordChanged(params) {
    
    var self = this;

    var container = params.container;

    container.header('Hooooraaahh!');


    self.loadLoginComponent = function () {
      container.updateActiveComponent('login-bar');
    };
  }
  
  return { viewModel: PasswordChanged, template: templateMarkup };

});
