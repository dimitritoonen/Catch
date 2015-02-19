define(['knockout', 'text!./activity-filter-dropdown.html'], function(ko, templateMarkup) {

  function ActivityFilterDropdown(params) {
    var self = this;

    self.activityModel = params.activityModel;
    self.label = params.label;
    self.items = params.listItems();
    
    self.selectItem = function (data, event) {
      params.activityModel.Filter.Category(data);
    };
  }


  
  return { viewModel: ActivityFilterDropdown, template: templateMarkup };

});
