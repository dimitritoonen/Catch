define(['knockout', 'text!./nav-bar.html', 'services/auth-service', 'models/activity-model'], function (ko, template, auth, activityModel) {

  function NavBar(params) {

    var self = this;
    
    self.route = params.route;
    self.search = activityModel.Filter.Search;

    // navigate to activities page when searching for activities
    self.loadActivities = function () {

      if (self.search() !== undefined && self.route() !== 'activities-page') {

        window.location.href = '#Workspace/Activities';
      }
    };
  }


  NavBar.prototype.LogOut = function () {
    auth.LogOut();
  };

  return { viewModel: NavBar, template: template };
});
