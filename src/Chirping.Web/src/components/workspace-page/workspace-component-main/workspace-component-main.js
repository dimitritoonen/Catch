define(['knockout', 'text!./workspace-component-main.html'], function(ko, templateMarkup) {

  function WorkspaceComponentMain(params) {
    
    var self = this;
    
    self.route = params.route;
  }

  WorkspaceComponentMain.prototype.dispose = function () {
    //
  };
  
  return { viewModel: WorkspaceComponentMain, template: templateMarkup };

});
