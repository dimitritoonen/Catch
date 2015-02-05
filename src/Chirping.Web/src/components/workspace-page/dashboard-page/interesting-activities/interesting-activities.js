define(['knockout', 'text!./interesting-activities.html'], function(ko, templateMarkup) {

  function InterestingActivities(params) {
    this.message = ko.observable('Hello from the interesting-activities component!');
  }

  // This runs when the component is torn down. Put here any logic necessary to clean up,
  // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
  InterestingActivities.prototype.dispose = function() { };
  
  return { viewModel: InterestingActivities, template: templateMarkup };

});
