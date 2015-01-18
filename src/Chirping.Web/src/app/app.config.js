define(['./environment-configuration'], function (environmentConfig) {

  // defines the acceptance configuration used throughout the SPA
  var config = environmentConfig['/*@echo NODE_ENV*/'];
  
  console.log(config);

  var configuration = {

    BaseUrl: config.baseUrl

  };

  return configuration;
});
