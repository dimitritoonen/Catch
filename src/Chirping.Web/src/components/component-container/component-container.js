define(['knockout', 'text!./component-container.html'], function (ko, templateMarkup) {

  function ComponentContainer(params) {
    
    var self = this;
    var parent = params.parent;

    self.showComponent = ko.observable(params.showComponent);
    
    self.activeComponent = ko.observable(params.component);

    initializeComponentAnimation();
    
    // get the component that will be loaded
    self.getActiveComponent = function () {
      return {
        name: self.activeComponent(),
        params: {
          container: self
        }
      }
    };

    // updates the currently active component
    self.updateActiveComponent = function (component) {
      
      removeComponentAnimation();

      self.activeComponent(component);

      refreshComponentAnimation();
    };

    // closes the container
    self.closeSelf = function () {
      parent.closeComponent();
    };
  }

  // initializes the animation of the component
  function initializeComponentAnimation() {
    $('#selectedComponent').css('opacity');
    $('#selectedComponent').css('top');
    $('#selectedComponent').addClass('show');
  };

  // remove the animation so that it can be refreshed
  function removeComponentAnimation() {
    $('#selectedComponent').addClass('disableAnimation');
    $('#selectedComponent').removeClass('show');
  };

  // REFACTOR: Need to find a way to remove the setTimeOut
  function refreshComponentAnimation() {
    setTimeout(function () {
      $('#selectedComponent').removeClass('disableAnimation');
      $('#selectedComponent').addClass('show');
    }, 20);
  }

  return { viewModel: ComponentContainer, template: templateMarkup };

});
