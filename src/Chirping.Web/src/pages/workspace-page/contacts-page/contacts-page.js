define(['knockout', 'text!./contacts-page.html'], function(ko, templateMarkup) {

  function ContactsPage(params) {
    this.message = ko.observable('Hello from the contacts-page component!');
  }

  // This runs when the component is torn down. Put here any logic necessary to clean up,
  // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
  ContactsPage.prototype.dispose = function() { };
  
  return { viewModel: ContactsPage, template: templateMarkup };

});
