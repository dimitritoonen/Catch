define(['knockout', 'text!./workspace-page.html'], function (ko, templateMarkup) {

  function WorkspacePage(params) {
    
    var self = this;

    self.route = params.route;

  }

  WorkspacePage.prototype.dispose = function () {
    //
  };
  
  return { viewModel: WorkspacePage, template: templateMarkup };

});
