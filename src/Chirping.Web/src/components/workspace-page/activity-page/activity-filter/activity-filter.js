define(['knockout', 'text!./activity-filter.html', 'moment', 'bindingHandlers/datetimepicker'], function (ko, templateMarkup, moment) {

  function ActivityFilter(params) {

    var self = this;

    self.activityModel = params.activityModel;
    
    self.categories = params.categories;

    self.participantList = ko.observableArray([
      { 'value': '2', 'description': '2 participants' },
      { 'value': '4', 'description': '4 participants' },
      { 'value': '5', 'description': '5 participants' },
      { 'value': '6', 'description': '6 participants' },
      { 'value': '7', 'description': '7 participants' },
      { 'value': '8', 'description': '8 participants' },
      { 'value': '9', 'description': 'More' }
    ]);
    

    self.fromDate = moment();
    self.tillDate = moment().add(1, 'month');

    // initializes the models till date
    self.activityModel.SetFilterTillDate(self.tillDate.format());

    var fromPicker, tillPicker;

    // initializes the from picker 
    self.onFromInit = function (picker) {

      fromPicker = picker;

      $(picker).on('dp.change', function (e) {
        
        if (e.date === null) {
          self.activityModel.ResetFilterFromDate();
        } else {
          $(tillPicker).data('DateTimePicker').minDate(e.date);

          self.activityModel.SetFilterFromDate(e.date.format());
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

           self.activityModel.SetFilterTillDate(e.date.format());
         }

         // unfocus after a date has been chosen
         $(tillPicker).blur();
      });
    }
  }

    
  return { viewModel: ActivityFilter, template: templateMarkup };

});
