define(['knockout', 'text!./activity-add-description.html', '../add-activity-model', 'moment', 'bootstrap-dialog', 'datetimepicker'],
  function (ko, templateMarkup, model, moment, bootstrapDialog, datetimepicker) {

    function ActivityAddDescription(params) {

      var self = this;

      var dateDialog, timeDialog;

      self.disposables = [];
      self.model = model;
      self.model.currentStep(2); // set step (also used when hitting the back button)

      var validationGroup = ko.validatedObservable({
        date: self.model.date,
        time: self.model.time,
        description: self.model.description
      });

      // disables/enabled the Next button
      var toggleNextButton = function (toggle) {
        if (toggle) {
          $('#nextStep').removeAttr('disabled');
        } else {
          $('#nextStep').attr('disabled', 'disabled');
        }
      }

      self.disposables.push(validationGroup.isValid.subscribe(function (valid) {
        toggleNextButton(valid);
      }));

      // execute on first load (also important for page back)
      toggleNextButton(validationGroup.isValid());
      
      self.updateDateButton = function (dialog) {
        // if no date is selected, set it to the default
        if (self.model.date() === undefined) {
          self.model.date(moment());
        }

        dialog.close();
      }

      self.updateTimeButton = function (dialog) {
        // if no time is selected, set it to the default
        if (self.model.time() === undefined) {
          self.model.time(moment(20, 'HH'));
        }

        dialog.close();
      }

      // ensures that the time pickers can select all minutes/hours
      self.yesterdaysDate = moment().add(-1, 'days');

      self.onDatePickerChange = function (m) { self.model.date(m.date); };
      self.onTimePickerChange = function (m) { self.model.time(m.date); }

      self.displayDateDialog = function () {
        dateDialog = new bootstrapDialog({
          animate: false,
          cssClass: 'datepicker-modal large-title modal-header-grey no-rounded-border',
          title: 'Select activity date',
          message: function (dialog) { return '<div id="activityDatePicker"></div>'; },
          buttons: [
            {
              label: 'Confirm',
              cssClass: 'btn btn-default btn-modal',
              action: function (dialog) { self.updateDateButton(dialog); }
            }
          ],
          onshown: function (dialog) {
            $('#activityDatePicker').datetimepicker(self.datePickerOptions);
            $('#activityDatePicker').on('dp.change', self.onDatePickerChange);
          }
        });
        dateDialog.realize();
        dateDialog.open();
      }

      self.displayTimeDialog = function () {
        timeDialog = new bootstrapDialog({
          animate: false,
          closable: true,
          cssClass: 'timepicker-modal large-title modal-header-grey no-rounded-border',
          title: 'Select activity time',
          message: function (dialog) { return '<div id="activityTimePicker"></div>'; },
          buttons: [
            {
              label: 'Confirm',
              cssClass: 'btn btn-default btn-modal',
              action: function (dialog) { self.updateTimeButton(dialog); }
            }
          ],
          onshown: function (dialog) {
            $('#activityTimePicker').datetimepicker(self.timePickerOptions);
            $('#activityTimePicker').on('dp.change', self.onTimePickerChange);
          }
        });
        timeDialog.realize();
        timeDialog.open();
      }

      self.datePickerOptions = { inline: true, sideBySide: false, minDate: Date.now() - 1, format: 'YYYY-MM-DD' };
      self.timePickerOptions = { inline: true, sideBySide: false, minDate: moment().add(-1, 'days'), format: 'HH:mm' };
    }

    // dispose class
    ActivityAddDescription.prototype.dispose = function () {

      // switch off events
      $('#activityDatePicker').off('dp.change');
      $('#activityTimePicker').off('dp.change');

      // dispose all subscription
      ko.utils.arrayForEach(this.disposables, function (item) {
        item.dispose();
      });
    };

    return { viewModel: ActivityAddDescription, template: templateMarkup };

  });
