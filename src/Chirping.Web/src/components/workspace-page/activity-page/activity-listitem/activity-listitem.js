define(['knockout', 'text!./activity-listitem.html', 'category-mapping', 'moment'], function (ko, templateMarkup, categoryMap, moment) {

  function ActivityListitem(params) {
       
    var self = this;

    self.activity = params.activity;
    self.category = params.activity.Category;
    self.participants = params.activity.Participants;
    self.owner = params.activity.Owner;
        
    var map = categoryMap;
    
    self.iconMap = map.Get(self.category.Code);
    
    // convert datetime format
    self.timestamp = moment(self.activity.Date).format('D MMMM / HH:mm');
   
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
