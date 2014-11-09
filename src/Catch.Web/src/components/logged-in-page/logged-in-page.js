define(['knockout', 'text!./logged-in-page.html'], function(ko, templateMarkup) {

  function LoggedinPage(params) {
    this.message = ko.observable('Hello from the loggedIn-page component!');
  }

  // This runs when the component is torn down. Put here any logic necessary to clean up,
  // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
  LoggedinPage.prototype.dispose = function() { };
  
  return { viewModel: LoggedinPage, template: templateMarkup };

});
