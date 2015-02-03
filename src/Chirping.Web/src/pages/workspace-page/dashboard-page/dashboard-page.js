define(['knockout', 'text!./dashboard-page.html'], function(ko, templateMarkup) {

  function DashboardPage(params) {
    this.message = ko.observable('Hello from the dashboard-page component!');
  }

  // This runs when the component is torn down. Put here any logic necessary to clean up,
  // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
  DashboardPage.prototype.dispose = function() { };
  
  return { viewModel: DashboardPage, template: templateMarkup };

});
