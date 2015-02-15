define(['knockout', 'text!./activity-filter-dropdown.html'], function(ko, templateMarkup) {

  function ActivityFilterDropdown(params) {
    var self = this;

    self.activityModel = params.activityModel;
    self.label = params.label;
    
    self.items = params.listItems();

    self.items.unshift({ 'code': undefined, 'description': '' });

    self.selectedItem = ko.observable(self.items[0].description);

    self.selectItem = function (data, event) {
      
      self.activityModel.SetFilterCategory(data.code);

      self.selectedItem(this.description);
    };
  }


  
  return { viewModel: ActivityFilterDropdown, template: templateMarkup };

});
