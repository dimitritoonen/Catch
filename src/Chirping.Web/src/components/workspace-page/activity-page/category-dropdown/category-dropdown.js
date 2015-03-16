define(['knockout', 'text!./category-dropdown.html', 'services/webapi-service'], function (ko, templateMarkup, webapi) {

  function CategoryDropdown(params) {
    var self = this;

    self.selectedItem = ko.observable();
    self.categories = params.categories;

    self.subscription = self.selectedItem.subscribe(function () {
      params.change(self.selectedItem());
    });
  }

  CategoryDropdown.prototype.dispose = function () {
    this.subscription.dispose();
  };
  
  return { viewModel: CategoryDropdown, template: templateMarkup };

});
