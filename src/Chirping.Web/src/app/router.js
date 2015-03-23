define(['knockout', 'crossroads', 'hasher', 'services/auth-service', './app.config', 'viewport'], function (ko, crossroads, hasher, auth, appConfig, viewport) {
  
  // return CrossroadsJS routing combined with Hasher for history enabled browsing
  return new Router({
    routes: [
        // default/intro page routing
        { url: '', params: { page: 'intro-page' } },
        { url: appConfig.HOMEPAGE, params: { page: 'intro-page' } },
        { url: 'ActivateAccount{?query}', params: { page: 'intro-page', component: 'activate-account' } },
        { url: 'ChangePassword{?query}', params: { page: 'intro-page', component: 'change-password' } },

        // workspace routing
        { url: 'Workspace', params: { page: 'workspace-page', subPage: 'dashboard-page' } },
        { url: 'Workspace/Dashboard', params: { page: 'workspace-page', subPage: 'dashboard-page' } },
        { url: 'Workspace/Activities', params: { page: 'workspace-page', subPage: 'activities-page' } },
        { url: 'Workspace/Notifications', params: { page: 'workspace-page', subPage: 'notifications-page' } },
        { url: 'Workspace/Contacts', params: { page: 'workspace-page', subPage: 'contacts-page' } },
        { url: 'Workspace/Profile', params: { page: 'workspace-page', subPage: 'profile-page' } },

        // add activity mobile
        { url: 'Workspace/Activities/Add', params: { page: 'workspace-page', subPage: 'activity-add-category', mobileOnly: true, redirectPage: 'Workspace/Activities' } },
        { url: 'Workspace/Activities/Add/Description', params: { page: 'workspace-page', subPage: 'activity-add-description', mobileOnly: true, redirectPage: 'Workspace/Activities' } },
        { url: 'Workspace/Activities/Add/Participants', params: { page: 'workspace-page', subPage: 'activity-add-participants', mobileOnly: true, redirectPage: 'Workspace/Activities' } },
        { url: 'Workspace/Activities/Add/Location', params: { page: 'workspace-page', subPage: 'activity-add-location', mobileOnly: true, redirectPage: 'Workspace/Activities' } }
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

      // redirect when route is for mobile navigation only
      crossroads.routed.add(AllowMobileViewport);
    });

    activateCrossroads();
  }
    
    
  function AddRouteToCrossroads(route) {
    
    crossroads.addRoute(route.url,

      // handler for processing matching routes
      // updates the currentSubRoute by default, and only updates the currentRoute when navigating from a different page.
      // This prevents the main pages from flickering when navigating between sub pages.
      function (requestParams) {
        
        // extend the page params with the subPage        
        ko.utils.extend(route.params, { subRoute: self.currentSubRoute });

        // extend the requestParams with route parameters
        ko.utils.extend(requestParams, route.params);

        SetSubPage(route);

        if (NavigateToDifferentPage(route.params.page)) {

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

  // check if the user is authenticated and redirect if not
  function AuthenticateUser(request, data) {
    
    var environment = '/*@echo NODE_ENV*/';

    if (request != appConfig.HOMEPAGE) {
      if (environment !== 'development') {
        auth.IsUserAuthenticated().done(function (result) {
          if (result === false) {
            RedirectToHomepage();
          }
        }).error(function (result) {
          RedirectToHomepage();
        });
      }
    }
  }

  // redirect when route is for mobile navigation only
  function AllowMobileViewport(request, data) {
    if (data.params[0].mobileOnly) {
      if (viewport.is.largerThan('ms')) {
        Redirect(data.params[0].redirectPage);
      }
    }
  }

  function RedirectToHomepage() {
    Redirect(appConfig.HOMEPAGE);
  }

  function Redirect(page) {
    window.location.replace('#' + page);
  }
});