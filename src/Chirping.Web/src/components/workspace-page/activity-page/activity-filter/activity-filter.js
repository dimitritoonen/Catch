define(['knockout', 'text!./activity-filter.html', 'datetimepicker'], function (ko, templateMarkup) {

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
    

    var onDateChanged = function (e) {
      if (e.date === null) {
        // hide

        self.activityModel.ResetFilterDate();
      } else if (e.date !== null) {
        self.activityModel.SetFilterDate(e.date._d);
      }

      // unfocus after a date has been chosen
      datepicker.blur();
    };
    
    var datepicker = $('.activity-filter-date').datetimepicker({
      defaultDate: Date.now(),
      minDate: Date.now() - 1,
      format: 'YYYY-MM-DD',
      toolbarPlacement: 'bottom',
      useCurrent: true,
      showClear: true
    }).on('dp.change', onDateChanged);


    $('.activity-filter-time').datetimepicker({
      format: 'HH:ss',
      collapse: true
    });
  }

    
  return { viewModel: ActivityFilter, template: templateMarkup };

});
