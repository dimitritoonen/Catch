define(['knockout', 'text!./workspace-component-right.html', 'services/auth-service'], function (ko, templateMarkup, auth) {

  function WorkspaceRight(params) {
  
    var self = this;

  }

  WorkspaceRight.prototype.LogOut = function () {
    auth.LogOut();
  };

  WorkspaceRight.prototype.dispose = function () {
  };
  
  return { viewModel: WorkspaceRight, template: templateMarkup };

});
