define(['./environment-configuration'], function (environmentConfig) {

  // defines the acceptance configuration used throughout the SPA
  var config = environmentConfig['/*@echo NODE_ENV*/'];
  
  // constructor
  var configuration = {

    BaseUrl: config.baseUrl,

    HomePage: '#Intro'
  };

  // defines the home page constant of the application
  configuration.HOMEPAGE = 'Intro';

  return configuration;
});
