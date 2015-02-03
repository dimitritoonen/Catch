define(['knockout', 'text!./notifications-page.html'], function(ko, templateMarkup) {

  function NotificationsPage(params) {
    this.message = ko.observable('Hello from the notifications-page component!');
  }

  // This runs when the component is torn down. Put here any logic necessary to clean up,
  // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
  NotificationsPage.prototype.dispose = function() { };
  
  return { viewModel: NotificationsPage, template: templateMarkup };

});
