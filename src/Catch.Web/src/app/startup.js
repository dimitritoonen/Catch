define(['jquery', 'knockout', './router', 'bootstrap', 'knockout-projections'], function($, ko, router) {
  
  var startup = {
    route: ko.observable(router.currentRoute)
  };

  // define ajax defaults
  $.ajaxSetup({
    contentType: 'application/json: charset-utf-8',
    dataType: 'json'
  });

  // Components can be packaged as AMD modules, such as the following:
  ko.components.register('nav-bar', { require: 'components/nav-bar/nav-bar' });
  ko.components.register('login-bar', { require: 'components/login-bar/login-bar' });
  ko.components.register('user-bar', { require: 'components/user-bar/user-bar' });
  ko.components.register('intro-page', { require: 'components/intro-page/intro-page' });
  ko.components.register('registration-page', { require: 'components/registration-page/registration-page' });
  ko.components.register('wizard-step1', { require: 'components/registration-page/wizard-step1/wizard-step1' });
  ko.components.register('wizard-step2', { require: 'components/registration-page/wizard-step2/wizard-step2' });
  ko.components.register('wizard-step3', { require: 'components/registration-page/wizard-step3/wizard-step3' });
  ko.components.register('logged-in-page', { require: 'components/logged-in-page/logged-in-page' });
  ko.components.register('main-page', { require: 'components/main-page/main-page' });

  // [Scaffolded component registrations will be inserted here. To retain this feature, don't remove this comment.]
  
  // Start the application
  //ko.applyBindings({ route: router.currentRoute });
  ko.applyBindings(startup);
});
