define(['knockout', 'text!./workspace-component-main.html'], function (ko, templateMarkup) {
  
  // constructor
  function WorkspaceMain(params) {
    
    var self = this;
    
    self.route = params.route;
  }

  WorkspaceMain.prototype.dispose = function () {
    //
  };
  
  return { viewModel: WorkspaceMain, template: templateMarkup };

});
