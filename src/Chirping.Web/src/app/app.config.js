define(['./environment-configuration'], function (environmentConfig) {

  // defines the acceptance configuration used throughout the SPA
  var config = environmentConfig['/*@echo NODE_ENV*/'];
    
  // load the mockjax component in development
  if ('/*@echo NODE_ENV*/' === 'development') {
    require(['mock-server'], function () { });
  }

  // constructor
  var configuration = {
    
    BaseUrl: config.baseUrl,

    HomePage: '#Intro'
  };

  // defines the home page constant of the application
  configuration.HOMEPAGE = 'Intro';

  return configuration;
});
