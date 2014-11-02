define(['knockout', 'text!./intro-page.html'], function(ko, templateMarkup) {

  function IntroPage(params) {
    this.message = ko.observable('Hello from the Intro-page component!');
  }

  // This runs when the component is torn down. Put here any logic necessary to clean up,
  // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
  IntroPage.prototype.dispose = function() { };
  
  return { viewModel: IntroPage, template: templateMarkup };

});
