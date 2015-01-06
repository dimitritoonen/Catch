define(['knockout', 'text!./intro-page.html', 'qtip2'], function (ko, templateMarkup) {

  function IntroPage(params) {

    var self = this;
    
    self.activeComponent = ko.observable(getActiveComponent(params.component));
    
  }

  function getActiveComponent(component) {


    if (component == null) {
        return 'login-bar';
    } else {
      return component;
    }
  };
  
  return { viewModel: IntroPage, template: templateMarkup };

});
