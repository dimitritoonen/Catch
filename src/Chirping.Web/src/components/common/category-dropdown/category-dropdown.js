define(['knockout', 'text!./category-dropdown.html', 'services/webapi-service'], function (ko, templateMarkup, webapi) {
  
  function CategoryDropdown(params) {

    var self = this;
    var initialValue = params.selectedItem;

    if (params.shouldInitialize) {
      params.shouldInitialize.subscribe(function (value) {
        if (value) {
          self.selectedItem(self.categories()[0]);
        }
      })
    }

    self.selectedItem = ko.observable();
    self.categories = params.categories;
    self.tabIndex = params.tabIndex;
    self.disposables = [];
    
    // select default category
    var selectedItem = self.categories.GetByProperty(params.selectedItem);
    self.selectedItem(selectedItem);
    
    self.disposables.push(self.selectedItem.subscribe(function (value) {
      params.change(self.selectedItem());
    }));

    if (params.shouldInitialize) {
      params.shouldInitialize(false);
    }
  }

  CategoryDropdown.prototype.dispose = function () {
    // dispose all subscriptions
    ko.utils.arrayForEach(this.disposables, function (item) {
      item.dispose();
    });
  };
  
  return { viewModel: CategoryDropdown, template: templateMarkup };

});
