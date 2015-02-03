define(['jquery', 'knockout', './router', 'bootstrap', 'validation/ko-validation-config', 'bindingHandlers/bindingHandlers'],
  function ($, ko, router, auth) {

    $.ajaxSetup({
      contentType: 'application/json; charset=utf-8'
    });


    // Components can be packaged as AMD modules, such as the following:

    // pages //

    ko.components.register('intro-page', { require: 'pages/intro-page/intro-page' });
    ko.components.register('workspace-page', { require: 'pages/workspace-page/workspace-page' });
    ko.components.register('dashboard-page', { require: 'pages/workspace-page/dashboard-page/dashboard-page' });
    ko.components.register('activities-page', { require: 'pages/workspace-page/activities-page/activities-page' });
    ko.components.register('contacts-page', { require: 'pages/workspace-page/contacts-page/contacts-page' });
    ko.components.register('notifications-page', { require: 'pages/workspace-page/notifications-page/notifications-page' });
    ko.components.register('profile-page', { require: 'pages/workspace-page/profile-page/profile-page' });

    // components //

    // intro-page -> login 
    ko.components.register('component-container', { require: 'components/intro-page/component-container/component-container' });
    ko.components.register('login-bar', { require: 'components/intro-page/login-bar/login-bar' });
    ko.components.register('forgot-password', { require: 'components/intro-page/forgot-password/forgot-password' });
    ko.components.register('reset-password-sent', { require: 'components/intro-page/forgot-password/reset-password-sent/reset-password-sent' });
    ko.components.register('error-box', { require: 'components/intro-page/component-container/error-box/error-box' });

    // intro-page -> change password
    ko.components.register('change-password', { require: 'components/intro-page/change-password/change-password' });
    ko.components.register('password-changed', { require: 'components/intro-page/change-password/password-changed/password-changed' });

    // intro-page -> activate account
    ko.components.register('activate-account', { require: 'components/intro-page/activate-account/activate-account' });
    ko.components.register('account-activated', { require: 'components/intro-page/activate-account/account-activated/account-activated' });

    // intro-page -> registration
    ko.components.register('register', { require: 'components/intro-page/registration-bar/registration-bar' });
    ko.components.register('wizard-step1', { require: 'components/intro-page/registration-bar/wizard-step1/wizard-step1' });
    ko.components.register('wizard-step2', { require: 'components/intro-page/registration-bar/wizard-step2/wizard-step2' });
    ko.components.register('wizard-step3', { require: 'components/intro-page/registration-bar/wizard-step3/wizard-step3' });
    ko.components.register('profile-image-upload', { require: 'components/intro-page/registration-bar/profile-image-upload/profile-image-upload' });
        

    // workspace-page 
    ko.components.register('nav-bar', { require: 'components/workspace-page/nav-bar/nav-bar' });
    ko.components.register('workspace-component-left', { require: 'components/workspace-page/workspace-component-left/workspace-component-left' });
    ko.components.register('workspace-component-right', { require: 'components/workspace-page/workspace-component-right/workspace-component-right' });
    ko.components.register('workspace-component-main', { require: 'components/workspace-page/workspace-component-main/workspace-component-main' });
            

    // [Scaffolded component registrations will be inserted here. To retain this feature, don't remove this comment.]
    
    
    // Start the application
    ko.applyBindings({ route: router.currentRoute });
  });
