define(['knockout', 'text!./profile-page.html'], function(ko, templateMarkup) {

  function ProfilePage(params) {
    this.message = ko.observable('Hello from the profile-page component!');
  }

  // This runs when the component is torn down. Put here any logic necessary to clean up,
  // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
  ProfilePage.prototype.dispose = function() { };
  
  return { viewModel: ProfilePage, template: templateMarkup };

});
