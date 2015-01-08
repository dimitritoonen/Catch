define(['knockout', 'text!./intro-page.html', 'qtip2'], function (ko, templateMarkup) {

  function IntroPage(params) {

    var self = this;

    self.component = ko.observable(params.component);

    // get browsed component (default to login-bar)
    self.getActiveComponent = function () {

      if (self.component() == null) {
        return 'login-bar';
      } else {
        return self.component();
      }
    };

    // define the size of the container based on the chosen component
    self.getContainerSize = function () {
      
      if (self.component() === 'register') {
        return 'big';
      }

    };

    self.getComponentParams = function () {
      return {
        component: self.getActiveComponent(),
        containerSize: self.getContainerSize()
      }
    };
  }
  
  return { viewModel: IntroPage, template: templateMarkup };

});
