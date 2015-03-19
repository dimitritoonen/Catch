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

    // store values from datepickers and dropdown
    self.onDatePickerChange = function (value) { self.date(value.date); };
    self.onTimePickerChange = function (value) { self.time(value.date); };
    self.onCategoryChange = function (category) { self.category(category); };

    // when control is expanded focus description field
    $('#addActivityControl').on('shown.bs.collapse', function () {
      $('#descriptionTextbox').focus();
    });
  }
  
  // dispose events
  ActivityAdd.prototype.dispose = function () {
    $('#addActivityControl').off('shown.bs.collapse');
  };

  return { viewModel: ActivityAdd, template: templateMarkup };

});
