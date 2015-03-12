define(function () {
  
  /* contains the environment specific configuration used throughout the SPA */

  var environmentConfig = {
    development: {
      baseUrl: 'http://192.168.1.17/Chirping.Web.Api/'
    },
    acceptance: {
      baseUrl: 'http://api-acceptance.chirping.nl/'
    },
    production: {
      baseUrl: 'http://api.chirping.nl/'
    }
  };

  return environmentConfig;
});
