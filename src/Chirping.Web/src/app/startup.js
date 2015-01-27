define(['jquery', 'knockout', './router', 'services/auth-service', 'bootstrap',
  'knockout-projections', 'knockout-validation', 'app/ko-validation-config', 'qtip2', 'bindingHandlers/bindingHandlers'],
  function ($, ko, router, auth) {

    var viewModel = {
      route: router.currentRoute,
      auth: auth
    };

    $.ajaxSetup({
      contentType: 'application/json; charset=utf-8'
    });

    // Components can be packaged as AMD modules, such as the following:

    // pages
    ko.components.register('intro-page', { require: 'pages/intro-page/intro-page' });

    // components
    ko.components.register('component-container', { require: 'components/component-container/component-container' });
    ko.components.register('login-bar', { require: 'components/login-bar/login-bar' });
    ko.components.register('forgot-password', { require: 'components/forgot-password/forgot-password' });
    ko.components.register('reset-password-sent', { require: 'components/forgot-password/reset-password-sent/reset-password-sent' });
    ko.components.register('error-box', { require: 'components/component-container/error-box/error-box' });    

    ko.components.register('activate-account', { require: 'components/activate-account/activate-account' });
    ko.components.register('account-activated', { require: 'components/activate-account/account-activated/account-activated' });

    ko.components.register('register', { require: 'components/registration-bar/registration-bar' });
    ko.components.register('wizard-step1', { require: 'components/registration-bar/wizard-step1/wizard-step1' });
    ko.components.register('wizard-step2', { require: 'components/registration-bar/wizard-step2/wizard-step2' });
    ko.components.register('wizard-step3', { require: 'components/registration-bar/wizard-step3/wizard-step3' });
    ko.components.register('profile-image-upload', { require: 'components/registration-bar/profile-image-upload/profile-image-upload' });
        
    // [Scaffolded component registrations will be inserted here. To retain this feature, don't remove this comment.]


    // Start the application
    ko.applyBindings(viewModel);
  });
