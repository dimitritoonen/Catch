define(['knockout'], function (ko) {

  // contains the parameters for registering a user

  function RegistrationModel() {

    this.isCurrentStepValid = ko.observable(false);

    // #region step 1
    this.emailAddress = ko.observable().extend(
      {
        required: true,
        email: true,
        isEmailAvailable: true
      });
    this.confirmEmail = ko.observable().extend({
      validation: {
        validator: function (val, someOtherVal) {

          // only validate if values has been entered
          if (val == null)
            return;

          return val === someOtherVal();
        },
        message: 'E-mail address must match',
        params: this.emailAddress
      }
    });
    this.registrationViaFacebook = ko.observable();
    // Password must be between 8 and 128 characters long and contain three of the following 4 items:
    // - upper case letter
    // - lower case letter
    // - a symbol
    // - a number
    this.password = ko.observable().extend({
      minLength: 8,
      maxLength: 128,
      passwordContainsDigit: true,
      passwordContainsUppercase: true,
      passwordContainsLowercase: true,
      passwordContainsSymbol: true
    });

    // #endregion step 1

    // step 2
    this.nickName = ko.observable();
    this.gender = ko.observable();
    this.city = ko.observable();
    this.age = ko.observable();
    this.interestedIn = ko.observable();

    // step 3
    this.motto = ko.observable();
  }

  return new RegistrationModel();

})