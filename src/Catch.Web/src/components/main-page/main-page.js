define(['knockout', 'text!./main-page.html'], function (ko, templateMarkup) {

  function MainPage(params) {
    
    alert(params.route().page);

    //var route = ko.observable();

  }

  // This runs when the component is torn down. Put here any logic necessary to clean up,
  // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
  MainPage.prototype.dispose = function() { };
  
  return { viewModel: MainPage, template: templateMarkup };

});
