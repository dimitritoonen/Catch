define(['knockout', 'text!./register-container.html'], function(ko, templateMarkup) {

  function RegisterContainer(params) {
 
    var self = this;
    
    self.activeComponent = ko.observable(params.component);
    
    setContainerSize(params.containerSize);

    self.closeComponent = function () {

    };
  }

  function setContainerSize(containerSize) {
    if (containerSize === 'big') {
      $('#register-container').removeClass('unregistered-container-small');
      $('#register-container').addClass('unregistered-container-big');
    }
  }
  
  return { viewModel: RegisterContainer, template: templateMarkup };

});
