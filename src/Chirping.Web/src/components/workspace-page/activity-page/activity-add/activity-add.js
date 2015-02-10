define(['knockout', 'text!./activity-add.html'], function(ko, templateMarkup) {

  function ActivityAdd(params) {
    this.message = ko.observable('Hello from the activity-add component!');
  }

  // This runs when the component is torn down. Put here any logic necessary to clean up,
  // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
  ActivityAdd.prototype.dispose = function() { };
  
  return { viewModel: ActivityAdd, template: templateMarkup };

});
