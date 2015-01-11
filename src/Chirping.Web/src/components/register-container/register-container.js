define(['knockout', 'text!./register-container.html'], function(ko, templateMarkup) {

  function RegisterContainer(params) {
    
    var self = this;
    var parent = params.parent;

    self.activeComponent = ko.observable(params.component);

    setContainerSize(self.activeComponent);


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
      self.activeComponent(component);
      setContainerSize(self.activeComponent);
    };

    // closes the container
    self.closeSelf = function () {
      parent.closeComponent();
    };
  }

  // defines the size of the container 
  function setContainerSize(component) {

    if (component() === 'register') {
      $('#register-container').removeClass('unregistered-container-small');
      $('#register-container').addClass('unregistered-container-big');
    } else {
      $('#register-container').removeClass('unregistered-container-big');
      $('#register-container').addClass('unregistered-container-small');
    }
  }
  
  return { viewModel: RegisterContainer, template: templateMarkup };

});
