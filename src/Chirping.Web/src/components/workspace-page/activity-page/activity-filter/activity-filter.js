define(['knockout', 'text!./activity-filter.html', 'moment', 'bindingHandlers/datetimepicker'], function (ko, templateMarkup, moment) {

  function ActivityFilter(params) {

    var self = this;

    self.activityModel = params.activityModel;
    
    self.categories = params.categories;

    self.participantList = ko.observableArray([
      { 'Code': '2', 'Description': '2 participants' },
      { 'Code': '4', 'Description': '4 participants' },
      { 'Code': '5', 'Description': '5 participants' },
      { 'Code': '6', 'Description': '6 participants' },
      { 'Code': '7', 'Description': '7 participants' },
      { 'Code': '8', 'Description': '8 participants' },
      { 'Code': '9', 'Description': 'More' }
    ]);
    
    self.fromPicker;
    self.tillPicker;

    // initializes the from picker 
    self.onFromInit = function (picker) {

      self.fromPicker = picker;

      $(picker).on('dp.change', function (e) {

        if (e.date === null) {
          self.activityModel.ResetFilterFromDate();
        } else {

          if (self.IsFromDateChanged(e.date))
            return;

          $(self.tillPicker).data('DateTimePicker').minDate(e.date.format());

          self.activityModel.Filter.FromDate(e.date.format());
        }
      });

      $(picker).on('dp.hide', function (e) {
        // unfocus after a date has been chosen
        $(self.fromPicker).blur();
      });
    }

    self.IsFromDateChanged = function (date) {
      return (date.format("YYYY-MM-DD") === moment(self.activityModel.Filter.FromDate()).format("YYYY-MM-DD"));
    }


    // initializes the till picker 
    self.onTillInit = function (picker) {

      self.tillPicker = picker;

       $(picker).on('dp.change', function (e) {

         if (e.date === null) {
           self.activityModel.ResetFilterTillDate();
         } else {
           $(self.fromPicker).data('DateTimePicker').maxDate(e.date.format());

           self.activityModel.Filter.TillDate(e.date.format());
         }
       });

       $(picker).on('dp.hide', function (e) {
         // unfocus after a date has been chosen
         $(self.tillPicker).blur();
       });
    }


    $(window).on('resize', function () {
      if (self.tillPicker !== undefined) {
        var tillDate = self.activityModel.Filter.TillDate();

        tillDate = (tillDate === undefined ? null : tillDate);
        $(self.tillPicker).data('DateTimePicker').date(tillDate);
      }

      if (self.fromPicker !== undefined) {
        var fromDate = self.activityModel.Filter.FromDate();

        fromDate = (fromDate === undefined ? null : fromDate);
        $(self.fromPicker).data('DateTimePicker').date(fromDate);
      }
    });

  }

  // clear event handlers
  ActivityFilter.prototype.dispose = function () {
    $(window).off('resize');
    $(self.tillPicker).off('db.hide');
    $(self.tillPicker).off('db.change');

    $(self.fromPicker).off('db.hide');
    $(self.fromPicker).off('db.change');
  };

    
  return { viewModel: ActivityFilter, template: templateMarkup };

});
