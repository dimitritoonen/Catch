define(['knockout', 'text!./intro-page.html', 'qtip2'], function (ko, templateMarkup) {

  function IntroPage(params) {

    var self = this;

    self.component = ko.observable();
    self.showComponent = ko.observable(false);
    self.querystring = {};
    
    // loads components if browsed for
    var initializeIntroPage = function (component) {
      if (component !== undefined) {

        // fetch the querystring parsed by crossroadsJs
        self.querystring = params[0];

        self.loadComponent(component);
      }
    };

    // load a particular component
    self.loadComponent = function (component) {
      self.component(component);
      self.showComponent(!self.showComponent());
    };

    self.loadComponent('register');

    initializeIntroPage(params.component);

    // closes the loaded component
    self.closeComponent = function () {
      self.showComponent(false);
      self.component(null);
    };

    // returns the parameters of the browsed component in string format
    self.getComponentParams = function () {
      return {
        parent: self,
        component: self.component(),
        showComponent: self.showComponent(),
        querystring: self.querystring
      };
    };
  }
  
  return { viewModel: IntroPage, template: templateMarkup };

});
