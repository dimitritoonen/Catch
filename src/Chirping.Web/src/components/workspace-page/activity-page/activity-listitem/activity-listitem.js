define(['knockout', 'text!./activity-listitem.html', '../category-icon-mapping', 'dateformat'], function (ko, templateMarkup, categoryMap) {

  function ActivityListitem(params) {
   
    var self = this;

    self.activity = params.activity;
    
    var map = categoryMap;

    self.iconMap = map.Get(params.activity.category.code);

    // convert datetime format
    var date = new Date(self.activity.date);
    self.timestamp = $.format.date(date, 'dd MMMM / HH:mm');
   

    self.expandTile = function () {
      $('.text').toggleClass('line-clamp');
    };
  }
  
  return { viewModel: ActivityListitem, template: templateMarkup };

});
