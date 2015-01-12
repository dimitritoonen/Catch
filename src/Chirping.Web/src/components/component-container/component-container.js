define(['knockout', 'text!./component-container.html'], function (ko, templateMarkup) {

  function ComponentContainer(params) {
    
    var self = this;
    var parent = params.parent;
    
    self.activeComponent = ko.observable(params.component);
    
    setContainerSize(self.activeComponent);

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
      setContainerSize(self.activeComponent);

      refreshComponentAnimation();
    };

    // closes the container
    self.closeSelf = function () {
      parent.closeComponent();
    };
  }

  // defines the size of the container 
  function setContainerSize(component) {

    if (component() === 'register') {
      $('#register-container').removeClass('contract');
      $('#register-container').addClass('expand');
    } else {
      $('#register-container').removeClass('expand');
      $('#register-container').addClass('contract');
    }
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
