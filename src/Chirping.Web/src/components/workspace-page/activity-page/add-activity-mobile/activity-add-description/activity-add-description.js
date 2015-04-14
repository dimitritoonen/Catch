define(['knockout', 'text!./activity-add-description.html', '../add-activity-model', 'moment', 'bootstrap-dialog', 'datetimepicker'],
  function (ko, templateMarkup, model, moment, bootstrapDialog, datetimepicker) {

  function ActivityAddDescription(params) {

    var self = this;

    self.model = model;
    self.model.currentStep(2); // set step (also used when hitting the back button)

    // ensures that the time pickers can select all minutes/hours
    self.yesterdaysDate = moment().add(-1, 'days');

    self.onDatePickerChange = function (date) {
      self.model.date = date;
    };

    self.onTimePickerChange = function (time) {
      self.model.time = time;
    }

    self.displayDateDialog = function () {
      
    }

    setTimeout(function () {
      var dialog = new bootstrapDialog({
        animate: false,
        closeByBackdrop: false,
        closeByKeyboard: false,
        cssClass: 'datetimepicker-modal large-title modal-header-grey no-rounded-border',
        title: 'Select activity date',
        message: function (dialog) {
          return '<div id="activityDatePicker"></div>';
        },
        onshown: function (dialog) {

          setTimeout(function () {
            $('#activityDatePicker').datetimepicker(self.datePickerOptions);
          }, 500);
        }
      });

      dialog.realize();
      dialog.open();
    }, 450);

    self.datePickerOptions = {
      inline: true,
      sideBySide: false,
      format: 'YYYY-MM-DD',
      minDate: Date.now() - 1,
    };
    
    self.onDatePickerChange = function (date) {
      console.log(date);
    }
  }
  
  return { viewModel: ActivityAddDescription, template: templateMarkup };

});
