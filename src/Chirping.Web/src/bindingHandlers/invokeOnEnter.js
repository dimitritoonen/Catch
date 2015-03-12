define(['knockout'], function (ko) {

  // knockout binding handler to invoke a function when the [Enter] key is pressed

  ko.bindingHandlers.invokeOnEnter = {
    
    init: function (element, valueAccessor) {

      var enterKey = 13;

      $(element).keyup(function (event) {
        if (event.keyCode == enterKey) {

          // needs to blur the DOM element to update the value of the possible bound observable
          $(element).blur();

          // invoke function 'funct()'
          valueAccessor().funct();
        }
      })
    }
  };

});