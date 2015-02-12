define(['knockout', 'text!./activity-filter-dropdown.html'], function(ko, templateMarkup) {

  function ActivityFilterDropdown(params) {
    var self = this;

    self.label = params.label;
    self.categories = ko.observableArray(params.listItems);
    self.selectedCategory = ko.observable(self.categories()[0].description);

    self.selectItem = function () {
      self.selectedCategory(this.description);
    };
  }


  
  return { viewModel: ActivityFilterDropdown, template: templateMarkup };

});
