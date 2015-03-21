define(['knockout', 'text!./add-activity.html', 'moment', 'viewport', 'bindingHandlers/datetimepicker', 'qtip2'],
  function (ko, templateMarkup, moment, viewport) {

  function AddActivity(params) {

    var self = this;

    self.shouldShow = ko.observable(viewport.is.largerThan('sm'));

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
  AddActivity.prototype.dispose = function () {
    $('#addActivityControl').off('shown.bs.collapse');
  };

  return { viewModel: AddActivity, template: templateMarkup };

});
