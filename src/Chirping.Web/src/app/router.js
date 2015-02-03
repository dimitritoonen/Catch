define(['knockout', 'crossroads', 'hasher', 'services/auth-service', './app.config'], function (ko, crossroads, hasher, auth, appConfig) {
  
  // return CrossroadsJS routing combined with Hasher for history enabled browsing
  return new Router({
    routes: [
        // default/workspace routing
        { url: '', params: { page: 'workspace-page' } },
        { url: 'Workspace', params: { page: 'workspace-page', subPage: 'dashboard-page' } },
        { url: 'Workspace/Dashboard', params: { page: 'workspace-page', subPage: 'dashboard-page' } },
        { url: 'Workspace/Activities', params: { page: 'workspace-page', subPage: 'activities-page' } },
        { url: 'Workspace/Notifications', params: { page: 'workspace-page', subPage: 'notifications-page' } },
        { url: 'Workspace/Contacts', params: { page: 'workspace-page', subPage: 'contacts-page' } },
        { url: 'Workspace/Profile', params: { page: 'workspace-page', subPage: 'profile-page' } },

        // intro page routing
        { url: appConfig.HOMEPAGE, params: { page: 'intro-page' } },
        { url: 'ActivateAccount{?query}', params: { page: 'intro-page', component: 'activate-account' } },
        { url: 'ChangePassword{?query}', params: { page: 'intro-page', component: 'change-password' } }
    ]
  });


  var self;

  // initializes the Router 
  function Router(config) {
    
    self = this;

    self.currentRoute = ko.observable();
    self.currentSubRoute = ko.observable();

    // adds all the pre-defined routes
    ko.utils.arrayForEach(config.routes, function (route) {

      AddRouteToCrossroads(route);

      // check if the user is authenticated and redirect if not
      crossroads.routed.add(AuthenticateUser);
    });


    activateCrossroads();
  }


    
  function AddRouteToCrossroads(route) {

    crossroads.addRoute(route.url,

      // handler for processing matching routes
      // updates the currentSubRoute by default, and only updates the currentRoute when navigating from a different page.
      // This prevents the main pages from flickering when navigating between sub pages.
      function (requestParams) {

        SetSubPage(route);
        
        if (NavigateToDifferentPage(route.params.page)) {
          
          // extend the page params with the subPage        
          ko.utils.extend(route.params, { subRoute: self.currentSubRoute });

          // extend the requestParams with route parameters
          ko.utils.extend(requestParams, route.params);

          self.currentRoute(requestParams);
        }
    });
  }

  function SetSubPage(route) {
    if (route.params.subPage !== undefined) {
      self.currentSubRoute(route.params.subPage);
    }
  }


  // returns a boolean value indicating that the user browsed from a different page
  function NavigateToDifferentPage(page) {
    return (self.currentRoute() == undefined ||
      self.currentRoute().page !== page);
  }


  // activate Crossroads JS client side routing functionality (with Hasher)
  function activateCrossroads() {
    function parseHash(newHash, oldHash) {
      crossroads.parse(newHash);
    }

    crossroads.normalizeFn = crossroads.NORM_AS_OBJECT;

    // to ensure that the generated codes maintain it's special characters when parsed from the querystring by CrossroadsJS
    hasher.raw = true;

    hasher.initialized.add(parseHash);
    hasher.changed.add(parseHash);
    hasher.init();
  }

  function AuthenticateUser(request, data) {
    
    var environment = '/*@echo NODE_ENV*/';

    if (request != appConfig.HOMEPAGE) {
      //if (environment !== 'development') {
        auth.IsUserAuthenticated().done(function (result) {
          if (result === false) {
            window.location.replace('#' + appConfig.HOMEPAGE);
          }
        })
      //}
    }
  }
});