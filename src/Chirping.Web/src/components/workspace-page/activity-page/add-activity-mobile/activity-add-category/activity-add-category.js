define(['knockout', 'text!./activity-add-category.html', '../add-activity-model', 'category-mapping'], function (ko, templateMarkup, model, categoryMap) {

  function ActivityAddCategory(params) {
    var self = this;
    
    self.model = model;
    self.model.currentStep(1); // reset step

    self.categories = model.categories;

    self.ResolveCategoryIcon = function (categoryCode) {
      return categoryMap.Get(categoryCode).icon;
    }


    self.categoryClicked = function (category) {
      model.category(category);

      model.nextStep();
    };
  }

  return { viewModel: ActivityAddCategory, template: templateMarkup };

});
