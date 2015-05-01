define(['jquery', 'knockout', 'qtip2'], function ($, ko) {

  // bind the QTip2 to the knockout validation
  ko.bindingHandlers.qtipValMessage = {
    update: function (element, valueAccessor, allBindingsAccessor, viewModel) {

      var observable = valueAccessor();
      var elementId = $(element).attr('id');

      clearTitle($(element));

      self.disposables = [];

      if (observable.isValid) {
        self.disposables.push(observable.isModified.subscribe(function (modified) {

          setValidationStateControl(elementId, observable.isValid());

          // reset the validation state when observable's validation is reset
          if (!modified && !observable.isValid()) {
            resetValidationState(elementId);
          }

        }));

        self.disposables.push(observable.isValid.subscribe(function (valid) {
          setValidationStateControl(elementId, valid);
        }));
      }

      // dispose subscriptions
      ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
        ko.utils.arrayForEach(disposables, function (item) {
          item.dispose();
        });
      });
    }
  };

  function resetValidationState(elementId) {

    var $element = $('#' + elementId);

    clearTitle($element);

    // destroy the tooltip
    $element.qtip('destroy');

    // remove the error icon
    $element.next('span').removeClass('glyphicon-remove');
  }

  function setValidationStateControl(elementId, isValid) {

    var $element = $('#' + elementId);

    if (!isValid) {
      showTooltip($element);
      return;
    }

    hideTooltip($element);
  }

  function showTooltip($element) {
    $element.qtip({
      suppress: false,
      show: { event: 'click mouseenter focus' },
      hide: {
        event: 'mouseleave focusout leave'
      },
      position: { my: 'bottom center', at: 'top center' },
      style: { classes: 'qtip-bootstrap' }
    });

    clearTitle($element);

    // display error icons
    $element.closest('.form-group').removeClass('has-success');
    $element.next('span').removeClass('glyphicon-ok');
    $element.next('span').addClass('glyphicon-remove');
  }

  function hideTooltip($element) {
    $element.qtip('destroy');

    // display success icons
    $element.closest('.form-group').addClass('has-success');
    $element.next('span').removeClass('glyphicon-remove');
    $element.next('span').addClass('glyphicon-ok');
  }

  function clearTitle($element) {
    // clear the error messages
    $element.attr('title', '');
    $element.removeAttr('data-orig-title');
    $element.parent().attr('title', '');
    $element.parent().removeAttr('data-orig-title');
  }

});