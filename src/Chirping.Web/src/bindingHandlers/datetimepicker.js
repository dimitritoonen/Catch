define(['knockout', 'datetimepicker'], function (ko) {

  // knockout binding handler to dynamically load a bootstrap tooltip and the title

  ko.bindingHandlers.datetimepicker = {

    init: function (element, valueAccessor) {

      var $element = $(element);
      var local = ko.utils.unwrapObservable(valueAccessor());
      var options = {};
      
      ko.utils.extend(options, ko.bindingHandlers.datetimepicker.options);
      ko.utils.extend(options, local.options);

      var picker = $element.datetimepicker(options);

      // automatically unfocus after a date has been chosen
      $element.on('dp.hide', function (e) {
        $element.blur();
      });

      // bind the update handler 
      if (local.change !== undefined) {
        $element.on('dp.change', local.change);
      }

      // passed back the slider DOM element
      if (local.init !== undefined) {
        local.init($element);
      }

      // clean up the binding handler
      ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
        $element.off('dp.hide');
        $element.off('dp.change');
      });
    },

    // default options
    options: {
      minDate: Date.now() - 1,
      format: 'YYYY-MM-DD',
      toolbarPlacement: 'bottom'
    }
  };

});