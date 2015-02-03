define(['knockout', 'text!./nav-bar.html'], function (ko, template) {

  function NavBarViewModel(params) {

    var self = this;

    //self.route = params.route;
    self.route = ko.observable({
      page: ''
    });
  }

  return { viewModel: NavBarViewModel, template: template };
});
