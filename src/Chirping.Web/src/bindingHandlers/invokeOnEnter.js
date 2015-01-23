define(['knockout'], function (ko) {

  // knockout binding handler to invoke a function when the [Enter] key is pressed

  ko.bindingHandlers.invokeOnEnter = {
    
    init: function (element, valueAccessor) {

      var enterKey = 13;

      $(element).keyup(function (event) {
        if (event.keyCode == enterKey) {

          // invoke function 'funct()'
          valueAccessor().funct();
        }
      })
    }
  };

});