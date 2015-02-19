define(['knockout', 'datetimepicker'], function (ko) {

  // knockout binding handler to dynamically load a bootstrap tooltip and the title

  ko.bindingHandlers.datetimepicker = {

    init: function (element, valueAccessor) {

      var local = ko.utils.unwrapObservable(valueAccessor());
      var options = {};
      
      ko.utils.extend(options, ko.bindingHandlers.datetimepicker.options);
      ko.utils.extend(options, local.options);

      $(element).datetimepicker(options);

      // passed back the slider DOM element
      local.init($(element));
    },

    // default options
    options: {
      minDate: Date.now() - 1,
      format: 'YYYY-MM-DD',
      toolbarPlacement: 'bottom'
    }
  };

});