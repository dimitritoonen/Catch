define(['knockout', 'text!./activity-listitem.html', '../category-icon-mapping', 'dateformat'], function (ko, templateMarkup, categoryMap) {

  function ActivityListitem(params) {
       
    var self = this;

    self.activity = params.activity;
    self.category = params.activity.category;
    self.participants = params.activity.participants;
    
    var map = categoryMap;

    self.iconMap = map.Get(self.category.code);
    
    // convert datetime format
    var date = new Date(self.activity.date);
    self.timestamp = $.format.date(date, 'dd MMMM / HH:mm');
   

    self.allowExpand = ko.observable(false);
    self.expandTile = function (data, event) {
      self.allowExpand(!self.allowExpand());

      // toggle the display of the participants
      $(event.target).find('.participants-wrapper').toggleClass('expand');
      $(event.target).siblings('.participants-wrapper').toggleClass('expand');
    };

    // initialize all bootstrap tooltips on the item
    $('[data-toggle="tooltip"]').tooltip();
    
  }
  
  return { viewModel: ActivityListitem, template: templateMarkup };

});
