define(['knockout', 'text!./change-password.html', 'services/webapi-service'], function(ko, templateMarkup, webapi) {

  function ChangePassword(params) {

    var self = this;
    var container = params.container;
    container.header('Change password');
    container.canCloseSelf(true);
    
    self.errorTitle = ko.observable();
    self.errorDescription = ko.observable();
    self.showErrorBox = ko.observable(false);
    
    // get a value from the querystring and return 'value_not_found' is the value is not present
    var GetValueFromQuerystring = function (value) {
      var querystring = container.querystring;

      if (querystring === undefined ||
        querystring[value] === undefined) {
        return 'value_not_found'
      }

      return querystring[value];
    };

    // get the e-mail from the querystring
    self.emailAddress = ko.computed(function () {
      return GetValueFromQuerystring('email');
    });

    // get the userId from the querystring
    self.userId = ko.computed(function () {
      return GetValueFromQuerystring('userId');
    });

    // get the generated token from the querystring
    self.code = ko.computed(function () {
      return GetValueFromQuerystring('confirmCode');
    });


    
    // toggles the modified property of the observable. This causes the knockout validation to re-initialize again.
    function resetObservable(observable) {
      observable.isModified(false);
      observable.isModified(true);
    }


    // add some validation to the newPassword and confirmNewPassword observables
    self.newPassword = ko.observable().extend({
      required: true,
      password: true,
      minLength: 8,
      maxLength: 128,
      passwordContainsDigit: true,
      passwordContainsUppercase: true,
      passwordContainsLowercase: true,
      passwordContainsSymbol: true
    });
    self.confirmNewPassword = ko.observable().extend({
      validation: {
        validator: function (val, someOtherVal) {

          // only validate if values has been entered
          if (val === undefined)
            return;

          return val === someOtherVal();
        },
        message: 'New password must match',
        params: self.newPassword
      }
    });

    // create a validation group to validate all controls
    self.validationGroup = ko.validatedObservable({
      newPassword: self.newPassword,
      confirmNewPassword: self.confirmNewPassword
    });
    
    // update the password
    self.updatePassword = function () {

      resetObservable(self.newPassword);
      resetObservable(self.confirmNewPassword);

      if (self.validationGroup.isValid()) {

        var url = 'api/Account/ResetPassword';
        var data = {
          Email: self.emailAddress(),
          UserId: self.userId(),
          Code: self.code(),
          NewPassword: self.newPassword(),
          ConfirmNewPassword: self.confirmNewPassword()
        };

        webapi.Post(url, data).done(function () {
          container.updateActiveComponent('password-changed');
        }).error(function (result) {
          self.showErrorBox(true);
        });
      }
    };

    // display the forgot-password component
    self.showForgotPassword = function () {
      container.updateActiveComponent('forgot-password');
    };
  }
  
  return { viewModel: ChangePassword, template: templateMarkup };

});
