define(['knockout', 'text!./add-activity.html', 'moment', 'viewport', 'models/add-activity-model', 'bindingHandlers/datetimepicker', 'qtip2'],
  function (ko, templateMarkup, moment, viewport, model) {

  function AddActivity(params) {

    var self = this;
    var controls = params.controls;

    self.disposables = [];
    self.id = params.id;
    self.shouldShow = ko.observable(viewport.is.largerThan('ms'));
    self.model = model;

    defineUniqueIdentifiersFor('descriptionTextbox', 'dateTextbox', 'timeTextbox', 'locationTextbox')
    
    // define a unique identifier for the html controls
    function defineUniqueIdentifiersFor () {
      for (var i = 0; i < arguments.length; i++) {
        var $element = $('#' + arguments[i]);
        var uniqueId = self.id + '_' + $element.attr('id');

        $element.attr('id', uniqueId);
      }
    }
    
    // collapse control on changing viewport
    self.disposables.push(viewport.currentViewpoint.subscribe(function (value) {

      if (viewport.is.smallerThan('sm')) {
        collapseControl();
      }

      self.shouldShow(!viewport.is.smallerThan('sm'));
    }));

    var collapseControl = function () {
      $('.activity .add').collapse('toggle');
    }

    // ensures that the time pickers can select all minutes/hours
    self.yesterdaysDate = moment().add(-1, 'days');

    var datePickerElement, timePickerElement;

    // store values from datepickers and dropdown
    self.onDatePickerInitialize = function ($element) { datePickerElement = $element; };
    self.onTimePickerInitialize = function ($element) { timePickerElement = $element; };

    self.onDatePickerChange = function (value) { model.date(value.date); };
    self.onTimePickerChange = function (value) { model.time(value.date); };

    self.onCategoryChange = function (category) { model.category(category); };

    // reset the date picker
    self.disposables.push(model.date.subscribe(function (value) {
      if (value === undefined) {
        datePickerElement.data('DateTimePicker').clear();
      }
    }));

    // reset the time picker
    self.disposables.push(model.time.subscribe(function (value) {
      if (value === undefined) {
        timePickerElement.data('DateTimePicker').clear();
      }
    }));

    // when control is expanded focus description field
    $('#addActivityControl').on('shown.bs.collapse', function () {
      $('#descriptionTextbox').focus();
    });
   
    // serve the activity details to the web api
    self.addActivity = function () {

      var isValid = model.addActivity();

      if (isValid) {
        collapseControl();
      }
    }
  }
  
  // dispose events
  AddActivity.prototype.dispose = function () {
    $('#addActivityControl').off('shown.bs.collapse');

    ko.utils.arrayForEach(this.disposables, function (item) {
      item.dispose();
    });
  };

  return { viewModel: AddActivity, template: templateMarkup };

});
