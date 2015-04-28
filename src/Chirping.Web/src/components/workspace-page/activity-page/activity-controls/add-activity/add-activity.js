define(['knockout', 'text!./add-activity.html', 'moment', 'viewport', 'models/add-activity-model', 'toastr', 'bindingHandlers/datetimepicker', 'qtip2'],
  function (ko, templateMarkup, moment, viewport, model, toastr) {

  function AddActivity(params) {

    var self = this;
    
    self.id = params.id;
    
    defineUniqueIdentifiersFor('descriptionTextbox', 'dateTextbox', 'timeTextbox', 'locationTextbox')

    // define a unique identifier for the html controls
    function defineUniqueIdentifiersFor () {
      for (var i = 0; i < arguments.length; i++) {
        var $element = $('#' + arguments[i]);
        $element.attr('id', self.id + '_' + $element.attr('id'));
      }
    }

    self.disposables = [];
    var controls = params.controls;

    self.shouldShow = ko.observable(viewport.is.largerThan('ms'));
    self.model = model;

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

    // store values from datepickers and dropdown
    self.onDatePickerChange = function (value) { model.date(value.date); };
    self.onTimePickerChange = function (value) { model.time(value.date); };
    self.onCategoryChange = function (category) { model.category(category); };

    // when control is expanded focus description field
    $('#addActivityControl').on('shown.bs.collapse', function () {
      $('#descriptionTextbox').focus();
    });

    // serve the activity details to the web api
    self.addActivity = function () {

      model.addActivity().done(function () {
        collapseControl();
        
        toastr["info"](
          "You've just created activity for " +
          model.date().format("YYYY-MMM-DD") + " " +
          model.time().format("HH:mm") + " at " +
          model.location(),
          "Activity created");

      }).error(function () {
        collapseControl();

        toastr["error"]("Something went wrong. Please try again at a later time");
      });
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
