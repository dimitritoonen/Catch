define(['knockout'], function (ko) {

  // knockout binding handler to dynamically load a bootstrap tooltip and the title

  ko.bindingHandlers.tooltip = {

    init: function (element, valueAccessor) {

      var local = ko.utils.unwrapObservable(valueAccessor());
      var options = {};

      ko.utils.extend(options, ko.bindingHandlers.tooltip.options);
      ko.utils.extend(options, local);

      $(element).tooltip(options);

      ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
        $(element).tooltip("destroy");
      });

    },

    // default options
    options: {
      placement: "top",
      trigger: "hover"
    }
  };

});