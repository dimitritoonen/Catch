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
    

    self.fromDate = moment();
    self.tillDate = moment().add(1, 'month');

    // initializes the models till date
    self.activityModel.Filter.TillDate(self.tillDate.format());

    var fromPicker, tillPicker;

    // initializes the from picker 
    self.onFromInit = function (picker) {

      fromPicker = picker;

      $(picker).on('dp.change', function (e) {
        
        if (e.date === null) {
          self.activityModel.ResetFilterFromDate();
        } else {
          $(tillPicker).data('DateTimePicker').minDate(e.date);

          self.activityModel.Filter.FromDate(e.date.format());
        }

        // unfocus after a date has been chosen
        $(fromPicker).blur();
      });
    }

    // initializes the till picker 
    self.onTillInit = function (picker) {

       tillPicker = picker;

       $(picker).on('dp.change', function (e) {
         
         if (e.date === null) {
           self.activityModel.ResetFilterTillDate();
         } else {
           $(fromPicker).data('DateTimePicker').maxDate(e.date);

           self.activityModel.Filter.TillDate(e.date.format());
         }

         // unfocus after a date has been chosen
         $(tillPicker).blur();
      });
    }


    $(window).on('resize', function () {
      if (fromPicker !== undefined) {
        var tillDate = self.activityModel.Filter.TillDate();

        tillDate = (tillDate === undefined ? null : tillDate);
        $(tillPicker).data('DateTimePicker').date(tillDate);
      }

      if (fromPicker !== undefined) {
        var fromDate = self.activityModel.Filter.FromDate();

        fromDate = (fromDate === undefined ? null : fromDate);
        $(fromPicker).data('DateTimePicker').date(fromDate);
      }
    });
  }

    
  return { viewModel: ActivityFilter, template: templateMarkup };

});
