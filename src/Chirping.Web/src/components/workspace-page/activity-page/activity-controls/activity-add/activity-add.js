define(['knockout', 'text!./activity-add.html', 'moment', 'bindingHandlers/datetimepicker', 'qtip2'], function (ko, templateMarkup, moment) {

  function ActivityAdd(params) {

    var self = this;

    // activity fields
    self.description = ko.observable().extend({ required: true });
    self.date = ko.observable().extend({ required: true });
    self.time = ko.observable().extend({ required: true });
    self.category = ko.observable().extend({ required: true });
    self.participants = ko.observable(7);
    self.location = ko.observable().extend({ required: true });

    self.categories = params.categories;

    // ensures that the time pickers can select all minutes/hours
    self.yesterdaysDate = moment().add(-1, 'days');

    self.onDatePickerChange = function (value) {

      self.date(value.date);

    };

    self.onTimePickerChange = function (value) {

      self.time(value.date);

    };

    self.onCategoryChange = function (category) {

      self.category(category);

    };


    $('#chainAcceptInfoButton').qtip({
      suppress: false,
      content: {
        text: $('#chainAcceptInfoButton').next('.tooltiptext')
      },
      show: { event: 'click mouseenter focus' },
      hide: {
        event: 'mouseleave focusout leave'
      },
      position: { my: 'bottom center', at: 'top center' },
      style: { classes: 'qtip-bootstrap' }
    });
  }
  
  return { viewModel: ActivityAdd, template: templateMarkup };

});
