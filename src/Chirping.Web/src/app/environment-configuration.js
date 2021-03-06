﻿define(function () {
  
  /* contains the environment specific configuration used throughout the SPA */

  var environmentConfig = {
    development: {
      baseUrl: 'http://localhost:4421/'
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
