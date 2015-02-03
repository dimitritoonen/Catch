define(['knockout', 'text!./profile-bar.html'], function(ko, templateMarkup) {

  function ProfileBar(params) {
    this.message = ko.observable('Hello from the profile-bar component!');
  }

  // This runs when the component is torn down. Put here any logic necessary to clean up,
  // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
  ProfileBar.prototype.dispose = function() { };
  
  return { viewModel: ProfileBar, template: templateMarkup };

});
