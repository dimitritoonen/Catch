define(['knockout', 'text!./intro-page.html', 'qtip2'], function (ko, templateMarkup) {

  function IntroPage(params) {

    var self = this;

    self.component = ko.observable(params.component);

    // define the size of the container based on the chosen component
    self.getContainerSize = function () {
      if (self.component() === 'register') {
        return 'big';
      }
    };

    // returns the parameters of the browsed component in string format
    self.getComponentParams = function () {
      return JSON.stringify({
        component: self.component(),
        containerSize: self.getContainerSize()
      });
    };

    // draw the html of the browsed component
    if (self.component() != null) {
      $('#component').append("<register-container params='" + self.getComponentParams() + "'><register-container>");
    }
  }
  
  return { viewModel: IntroPage, template: templateMarkup };

});
