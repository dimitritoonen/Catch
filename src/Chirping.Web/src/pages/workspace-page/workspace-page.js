define(['knockout', 'text!./workspace-page.html'], function (ko, templateMarkup) {

  function WorkspacePage(params) {
    
    var self = this;
       
    // catches the sub page for the workspace
    self.route = params.route.subRoute;
  }
  
  return { viewModel: WorkspacePage, template: templateMarkup };

});
