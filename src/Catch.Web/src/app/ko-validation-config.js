﻿define(['knockout', 'services/auth-service', 'knockout-validation'], function (ko, auth) {

  // configure knockout validation
  ko.validation.init({
    errorsAsTitle: false,
    insertMessages: false,
    errorsAsTitleOnModified: false,
    decorateElement: true,
    errorElementClass: 'has-error',
    errorClass: 'has-error',
    parseInputAttributes: false,
    messagesOnModified: false,
    decorateElementOnModified: true,
    decorateInputElement: true,
    grouping: { deep: true }
  });

  
  // bind the QTip2 to the knockout validation
  ko.bindingHandlers.qtipValMessage = {
    update: function (element, valueAccessor, allBindingsAccessor, viewModel) {
      var observable = valueAccessor();
      var $element = $(element);

      if (observable.isValid) {
        observable.isModified.subscribe(function (modified) {
          if (!observable.isValid()) {
            SetValidationStateControl($element, observable, false);
          }

        })

        observable.isValid.subscribe(function (valid) {
          SetValidationStateControl($element, observable, valid);

        })
      }
    }
  };

  function SetValidationStateControl(element, observable, isValid) {
    if (!isValid) {
      element.qtip({
        show: { ready: true },
        hide: { fixed: true },
        content: { text: observable.error }
      });

      element.closest('.form-group').removeClass('has-success');
      element.next('span').removeClass('glyphicon-ok');
      element.next('span').addClass('glyphicon-remove');
      element.attr('title', '');
    } else {
      element.qtip('destroy');

      element.closest('.form-group').addClass('has-success');
      element.next('span').removeClass('glyphicon-remove');
      element.next('span').addClass('glyphicon-ok');
      element.attr('title', '');
    }
  };
  

  // custom validation rule
  // checks if the email address is already used by the registered users
  ko.validation.rules['isEmailAvailable'] = {
    async: true,
    validator: function (email, enabled, callback) {
      auth.IsEmailAddressAvailable(email, function (result) {
        callback(result);
      });
    },
    message: 'Email address is invalid or already taken'
  };


  // verifies if the password has at least one digit
  ko.validation.rules['passwordContainsDigit'] = {
    validator: function (val) {
      return /(\d+)/.test('' + val + '');
    },
    message: 'Password must contain a least one digit'
  };

  // verifies if the password has at least one uppercase letter
  ko.validation.rules['passwordContainsUppercase'] = {
    validator: function (val) {
      return /([A-Z]+)/.test('' + val + '');
    },
    message: 'Password must contain a least one uppercase letter'
  };

  // verifies if the password has at least one uppercase letter
  ko.validation.rules['passwordContainsLowercase'] = {
    validator: function (val) {
      return /([a-z]+)/.test('' + val + '');
    },
    message: 'Password must contain a least one lowercase letter'
  };

  // verifies if the password has at least one symbol
  ko.validation.rules['passwordContainsSymbol'] = {
    validator: function (val) {
      return /([\W]+)/.test('' + val + '');
    },
    message: 'Password must contain a least one symbol'
  };

  ko.validation.registerExtenders();

});