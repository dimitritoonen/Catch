define(['knockout', 'text!./activity-filter.html', 'moment', 'bindingHandlers/datetimepicker'], function (ko, templateMarkup, moment) {

  function ActivityFilter(params) {

    var self = this;

    self.activityModel = params.activityModel;

    // initialize category list with empty value
    self.categories = ko.observableArray([{ 'Code': undefined, 'Description': '' }]);
    self.categories.push.apply(self.categories, params.categories());
    
    self.fromPicker, self.tillPicker;
    
    self.onCategoryChange = function (category) {
      self.activityModel.Filter.Category(category);
    };

    self.onParticipantsChange = function (participants) {
      params.activityModel.Filter.Participants(participants)
    };

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
    }

    // scale participant slider
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
    $(self.tillPicker).off('db.change');
    $(self.fromPicker).off('db.change');
  };

    
  return { viewModel: ActivityFilter, template: templateMarkup };

});
