define(['jquery', 'knockout', 'qtip2'], function ($, ko) {

  // bind the QTip2 to the knockout validation
  ko.bindingHandlers.qtipValMessage = {
    update: function (element, valueAccessor, allBindingsAccessor, viewModel) {

      var observable = valueAccessor();
      var elementId = $(element).attr('id');

      $(element).attr('title', '');
      $(element).parent().attr('title', '');

      self.disposables = [];

      if (observable.isValid) {
        self.disposables.push(observable.isModified.subscribe(function (modified) {
          if (!observable.isValid()) {
            SetValidationStateControl(elementId, observable, observable.isValid());
          }

          if (!modified && observable.isValid()) {
            SetValidationStateControl(elementId, observable, observable.isValid());
          }

        }));

        self.disposables.push(observable.isValid.subscribe(function (valid) {
          SetValidationStateControl(elementId, observable, valid);
        }));
      }

      ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
        ko.utils.arrayForEach(disposables, function (item) {
          item.dispose();
        });
      });
    }
  };


  function SetValidationStateControl(elementId, observable, isValid) {

    var $element = $('#' + elementId);
    
    if (!isValid) {

      $element.qtip({
        suppress: false,
        show: { event: 'click mouseenter focus' },
        hide: {
          event: 'mouseleave focusout leave'
        },
        position: { my: 'bottom center', at: 'top center' },
        style: { classes: 'qtip-bootstrap' }
      });

      $element.attr('title', '');
      $element.parent().attr('title', '');

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