define(['knockout', 'text!./intro-page.html', 'qtip2'], function (ko, templateMarkup) {

  function IntroPage(params) {
  }
  
  return { viewModel: IntroPage, template: templateMarkup };

});
