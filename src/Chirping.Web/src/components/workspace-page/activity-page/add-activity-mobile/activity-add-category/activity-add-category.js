define(['knockout', 'text!./activity-add-category.html', '../add-activity-wizard', 'models/add-activity-model', 'category-mapping'],
  function (ko, templateMarkup, wizard, model, categoryMap) {

    function ActivityAddCategory(params) {
      var self = this;

      self.model = model;
      wizard.currentStep(1); // set step (also used when hitting the back button)

      self.categories = model.categories;

      self.resolveCategoryIcon = function (categoryCode) {
        return categoryMap.Get(categoryCode).icon;
      }

      self.categoryClicked = function (category) {
        model.category(category);

        wizard.nextStep();
      };
    }

    ActivityAddCategory.prototype.dispose = function () {
      model.dispose();
    }

    return { viewModel: ActivityAddCategory, template: templateMarkup };

  });
