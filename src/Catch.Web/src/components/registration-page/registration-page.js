define(['knockout', 'text!./registration-page.html'], function(ko, templateMarkup) {

  function RegistrationPage(params) {


  }

  // This runs when the component is torn down. Put here any logic necessary to clean up,
  // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
  RegistrationPage.prototype.dispose = function() { };
  
  return { viewModel: RegistrationPage, template: templateMarkup };

});
