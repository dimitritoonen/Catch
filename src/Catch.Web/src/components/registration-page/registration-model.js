define(['knockout'], function (ko) {

  // contains the filled in properties of the registration form

  function RegistrationModel() {
    
    this.isCurrentStepValid = ko.observable(false);

    // #region step 1

    this.isStep1Valid = ko.observable(false);

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

    this.validateStep1 = function () {
      resetObservable(this.emailAddress);
      resetObservable(this.confirmEmail);
      resetObservable(this.password);
    };

    // #endregion step 1



    // #region step 2

    this.isStep2Valid = ko.observable(false);

    this.nickName = ko.observable().extend({
      required: true,
      maxLength: 50,
      IsNickNameAvailable: true
    });

    this.gender = ko.observable('Male');

    this.city = ko.observable().extend({
      required: true
    });

    this.age = ko.observable().extend({
      required: true,
      isDigit: true,
      maxLength: 3
    });

    this.interestedIn = ko.observable('Female');
    
    this.validationGroupStep2 = ko.validatedObservable({
      nickName: this.nickName,
      city: this.city,
      age: this.age
    })

    this.validateStep2 = function () {
      
      resetObservable(this.nickName);
      resetObservable(this.city);
      resetObservable(this.age);
    };

    // #endregion step 2



    
    // #region step 3

    this.isStep3Valid = ko.observable(false);

    this.selectedMottoOption = ko.observable();

    this.motto = ko.observable().extend({
      required: true
    });

    this.validateStep3 = function () {
      resetObservable(this.motto);
    };

    // #endregion step 3


    // indicates if all steps in the wizard are completely filled in.
    this.isRegistrationComplete = ko.computed(function () {
      return this.isStep1Valid() && this.isStep2Valid() && this.isStep3Valid();
    }, this);


    this.getCompletedUserData = function () {

      // convert to ko.mapping.toJS

      var data = {
        NickName: this.nickName(),
        Email: this.emailAddress(),
        ConfirmEmail: this.confirmEmail(),
        Password: this.password(),
        Gender: this.gender(),
        City: this.city(),
        Age: this.age(),
        InterestedIn: this.interestedIn()
      };

      return data;
    };
  }


  // toggles the modified property of the observable. This causes the knockout validation to re-initialize again.
  function resetObservable(observable) {
    observable.isModified(false);
    observable.isModified(true);
  };

  return new RegistrationModel();

})