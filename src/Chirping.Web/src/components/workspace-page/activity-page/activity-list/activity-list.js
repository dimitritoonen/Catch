define(['knockout', 'text!./activity-list.html'], function(ko, templateMarkup) {

  function ActivityList(params) {
    this.message = ko.observable('Hello from the activity-list component!');
  }

  // This runs when the component is torn down. Put here any logic necessary to clean up,
  // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
  ActivityList.prototype.dispose = function() { };
  
  return { viewModel: ActivityList, template: templateMarkup };

});
