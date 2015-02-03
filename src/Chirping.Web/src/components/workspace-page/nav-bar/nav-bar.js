define(['knockout', 'text!./nav-bar.html', 'services/auth-service'], function (ko, template, auth) {

  function NavBar(params) {

    var self = this;
    
    self.route = params.route;
  }


  NavBar.prototype.LogOut = function () {
    auth.LogOut();
  };

  return { viewModel: NavBar, template: template };
});
