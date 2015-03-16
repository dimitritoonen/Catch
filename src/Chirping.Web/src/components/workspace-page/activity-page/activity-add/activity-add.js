define(['knockout', 'text!./activity-add.html', 'bindingHandlers/datetimepicker'], function (ko, templateMarkup) {

  function ActivityAdd(params) {
    
    var self = this;

    // activity fields
    self.description = ko.observable().extend({
      required: true
    });
    self.date = ko.observable().extend({
      required: true
    });
    self.time = ko.observable().extend({
      required: true
    });
    self.category = ko.observable().extend({
      required: true
    });
    self.location = ko.observable().extend({
      required: true
    });

    self.categories = params.categories;
    
    self.onDatePickerChange = function (value) {

      self.date(value.date);

    };

    self.onTimePickerChange = function (value) {

      self.time(value.date);

    };

    self.onCategoryChange = function (category) {
      
      self.category(category);
      
    };
  }

  ActivityAdd.prototype.dispose = function() { };
  
  return { viewModel: ActivityAdd, template: templateMarkup };

});
