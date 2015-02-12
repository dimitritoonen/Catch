define(['knockout', 'text!./activity-filter.html', 'datetimepicker'], function (ko, templateMarkup) {

  function ActivityFilter(params) {
    
    var self = this;
    
    self.categoryList = [
      { value: 'games', description: 'Games' },
      { value: 'food', description: 'Food & Drinks' },
      { value: 'entertainment', description: 'Entertainment' },
      { value: 'dating', description: 'Dating' }
    ];

    self.participantList = [
      { value: '2', description: '2 participants' },
      { value: '4', description: '4 participants' },
      { value: '5', description: '5 participants' },
      { value: '6', description: '6 participants' },
      { value: '7', description: '7 participants' },
      { value: '8', description: '8 participants' },
      { value: '9', description: 'More' }
    ];
    
    $('.activity-filter-date').datetimepicker({
      defaultDate: Date.now(),
      minDate: Date.now() - 1,
      format: 'YYYY-MM-DD',
      collapse: true
    });


    $('.activity-filter-time').datetimepicker({
      defaultDate: Date.now(),
      format: 'HH:ss',
      collapse: true
    });
  }

    
  return { viewModel: ActivityFilter, template: templateMarkup };

});
