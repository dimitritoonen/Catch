define(['jquery', 'knockout'], function ($, ko) {

  // bind the QTip2 to the knockout validation
  ko.bindingHandlers.qtipValMessage = {
    update: function (element, valueAccessor, allBindingsAccessor, viewModel) {

      var observable = valueAccessor();
      var elementId = $(element).attr('id');

      if (observable.isValid) {
        observable.isModified.subscribe(function (modified) {
          if (!observable.isValid()) {
            SetValidationStateControl(elementId, observable, observable.isValid());
          }

          if (!modified && observable.isValid()) {
            SetValidationStateControl(elementId, observable, observable.isValid());
          }

        });

        observable.isValid.subscribe(function (valid) {
          SetValidationStateControl(elementId, observable, valid);
        });
      }
    }
  };


  function SetValidationStateControl(elementId, observable, isValid) {

    var $element = $('#' + elementId);

    if (!isValid) {

      $element.qtip({
        suppress: false,
        show: { ready: true },
        hide: { fixed: true },
        position: { my: 'left center', at: 'right center' },
        style: { classes: 'qtip-bootstrap qtip-icon qtip-red' },
        content: {
          //text: observable.error
          text: true,
          attr: 'title',
          button: false
        }
      });

      $element.closest('.form-group').removeClass('has-success');
      $element.next('span').removeClass('glyphicon-ok');
      $element.next('span').addClass('glyphicon-remove');
    } else {

      $element.qtip('destroy');

      $element.closest('.form-group').addClass('has-success');
      $element.next('span').removeClass('glyphicon-remove');
      $element.next('span').addClass('glyphicon-ok');
    }
  }

});