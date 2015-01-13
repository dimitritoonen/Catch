define(['knockout', 'bootstrap-dialog', './facebook-registration-model'], function (ko, bootstrapDialog, facebook) {

  // contains the filled in properties of the registration form

  function RegistrationModel() {

    var self = this;
    
    self.isCurrentStepValid = ko.observable(false);

    // #region step 1

    self.isStep1Valid = ko.observable(false);

    self.emailAddress = ko.observable().extend(
      {
        required: true,
        email: true,
        isEmailAvailable: true
      });
    self.confirmEmail = ko.observable().extend({
      validation: {
        validator: function (val, someOtherVal) {

          // only validate if values has been entered
          if (val == null)
            return;

          return val === someOtherVal();
        },
        message: 'E-mail address must match',
        params: self.emailAddress
      }
    });
    

    // this operation is called from the authcomplete.html to finish off the facebook registration
    self.registerFacebookUser = function (user) {

      if (user.haslocalaccount == 'False') {
        facebook.storeFacebookDetails(user);
      } else {

        var dialog = new bootstrapDialog({
          message: getMessage(),
          cssClass: 'wizard-registereduser-dialog'
        });

        // create the dialog
        dialog.realize();
        dialog.getModalHeader().hide();
        dialog.open();
      }
    };
    
    var getMessage = function () {
      // define the html to display in the modal dialog
      var $message = $('<div id="wizard-dialogProfileContainer">');
      $message.append('<span class="glyphicon glyphicon-remove" aria-hidden"true"></span>');
      $message.append('The user is already registered with Chirping');
      $message.append('</div>');
      return $message;
    };

    // get the Ok button for the dialog
    var getOkButton = function () {
      return [{
        label: 'Ok',
        cssClass: 'btn-primary',
        action: function (dialog) {
          dialog.close();
        }
      }];
    };

    self.Facebook = facebook;

    // indicates if the form uses facebook credentials for authentication
    self.UseFacebookAuthentication = ko.computed(function () {
      return facebook.UseFacebookAuthentication();
    });

    
    // Password must be between 8 and 128 characters long and contain three of the following 4 items:
    // - upper case letter
    // - lower case letter
    // - a symbol
    // - a number
    self.password = ko.observable().extend({
      minLength: 8,
      maxLength: 128,
      passwordContainsDigit: true,
      //passwordContainsUppercase: true,
      passwordContainsLowercase: true,
      passwordContainsSymbol: true
    });

    self.validateStep1 = function () {
      resetObservable(self.emailAddress);
      resetObservable(self.confirmEmail);
      resetObservable(self.password);
    };

    // #endregion step 1



    // #region step 2

    self.isStep2Valid = ko.observable(false);
    
    self.nickName = ko.observable().extend({
      required: true,
      maxLength: 50,
      IsNickNameAvailable: true
    });

    self.profileImage1 = ko.observable();
    self.profileImage2 = ko.observable();
    self.profileImage3 = ko.observable();

    self.gender = ko.observable('Male');

    self.city = ko.observable().extend({
      required: true
    });

    self.age = ko.observable().extend({
      required: true,
      isDigit: true,
      maxLength: 3,
      max: 150,
      min: 16
    });

    self.interestedIn = ko.observable('Female');
    
    self.validationGroupStep2 = ko.validatedObservable({
      nickName: self.nickName,
      city: self.city,
      age: self.age
    })

    self.validateStep2 = function () {
      
      resetObservable(self.nickName);
      resetObservable(self.city);
      resetObservable(self.age);
    };

    // #endregion step 2



    
    // #region step 3

    self.isStep3Valid = ko.observable(false);

    self.selectedMottoOption = ko.observable();

    self.motto = ko.observable().extend({
      required: true
    });

    self.validateStep3 = function () {
      resetObservable(this.motto);
    };

    // #endregion step 3


    // indicates if all steps in the wizard are completely filled in.
    self.isRegistrationComplete = ko.computed(function () {
      return self.isStep1Valid() && self.isStep2Valid() && self.isStep3Valid();
    });


    // public: get the filled in user data
    self.GetUserData = function () {
      if (self.Facebook.UseFacebookAuthentication()) {
        return getCompletedFacebookUserData();
      } else {
        return getCompletedUserData();
      }
    };

    // gets the completed user data + profile
    var getCompletedUserData = function () {
      return {
        Email: self.emailAddress(),
        ConfirmEmail: self.confirmEmail(),
        Password: self.password(),
        Profile: getProfileData()
      };
    };

    // gets the completed facebook user data + profile
    var getCompletedFacebookUserData = function () {
      return {
        Email: facebook.Email,
        ExternalAccessToken: facebook.ExternalAccessToken,
        Profile: getProfileData()
      };
    };

    // gets profile data 
    var getProfileData = function() {
      return {
        NickName: self.nickName(),
        Gender: self.gender(),
        City: self.city(),
        Age: self.age(),
        InterestedIn: self.interestedIn()
      }
    };

  }


  // toggles the modified property of the observable. This causes the knockout validation to re-initialize again.
  function resetObservable(observable) {
    observable.isModified(false);
    observable.isModified(true);
  };

  return new RegistrationModel();

})