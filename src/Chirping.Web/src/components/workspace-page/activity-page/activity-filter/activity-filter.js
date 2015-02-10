define(['knockout', 'text!./activity-filter.html', 'datetimepicker', 'metro-slider'], function (ko, templateMarkup) {

  function ActivityFilter(params) {
    
    var self = this;

    self.participants = ko.observable(2);

    self.participants.subscribe(function () {
      
    })

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

    $('#ActivityDatePicker').datetimepicker({
      defaultDate: Date.now(),
      minDate: Date.now() - 1,
      format: 'YYYY-MM-DD',
      collapse: true
    });


    $('#ActivityTimePicker').datetimepicker({
      defaultDate: Date.now(),
      format: 'HH:ss',
      collapse: true
    });

    $('#participantsSlider').slider({
      min: self.participants(),
      change: function (value, ui) {

        console.log(ui);

        self.participants(value);
      }
    });

    ScaleSlider();
    
    $(window).bind("load", ScaleSlider);
    $(window).bind("resize", ScaleSlider);
    $(window).bind("orientationchange", ScaleSlider);
  }

  // scale to slider to it's parent
  function ScaleSlider() {
    
    var element = $('#participantsSlider').find('complete');

    var parentWidth = $('#participantsSlider').parent().width();

    if (parentWidth) {
      $('#participantsSlider').width(parentWidth);
    } else {
      window.setTimeout(ScaleSlider, 30);
    }

  };
    
  return { viewModel: ActivityFilter, template: templateMarkup };

});
