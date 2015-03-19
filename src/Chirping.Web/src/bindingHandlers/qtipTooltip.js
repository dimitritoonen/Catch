define(['knockout', 'qtip2'], function (ko) {

  // knockout binding handler to dynamically load a qtip tooltip and the title

  ko.bindingHandlers.qtipTooltip = {

    init: function (element, valueAccessor) {

      var local = ko.utils.unwrapObservable(valueAccessor());
      var options = {};

      ko.utils.extend(options, ko.bindingHandlers.qtipTooltip.options);
      ko.utils.extend(options, local);

      $(element).qtip(options);

      ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
        $(element).qtip("destroy");
      });

    },

    // default options
    options: {
      suppress: false,
      show: { event: 'click mouseenter focus' },
      hide: {
        event: 'mouseleave focusout leave'
      },
      position: { my: 'bottom center', at: 'top center' },
      style: { classes: 'qtip-bootstrap' }
    }
  };

});