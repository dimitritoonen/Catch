define(['knockout', 'metro-touch-handler', 'metro-slider'], function (ko) {

  // knockout binding handler to dynamically load a bootstrap tooltip and the title

  ko.bindingHandlers.slider = {

    init: function (element, valueAccessor) {

      var local = ko.utils.unwrapObservable(valueAccessor());
      var options = {};

      ko.utils.extend(options, ko.bindingHandlers.slider.options);
      ko.utils.extend(options, local.options);
      
      $(element).slider(options);

      // passed back the slider DOM element
      local.init($(element));
    },

    // default options
    options: {
      min: 2
    }
  };

});