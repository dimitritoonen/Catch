define(['knockout', 'viewport', 'services/webapi-service', 'toastr'], function (ko, viewport, webapi, toastr) {
  
  function AddActivityModel() {

    var self = this;
    
    self.categories = ko.observableArray([]);
    self.shouldShowMobile = ko.observable(viewport.is.smallerThan('sm'));

    self.disposables = [];
    self.disposables.push(viewport.currentViewpoint.subscribe(function (value) {
      self.shouldShowMobile(viewport.is.smallerThan('sm'));

      //if (viewport.is.largerThan('ms')) {
      //  console.log('larger');
      //}
    }));
    
    // fields
    self.category = ko.observable();
    self.description = ko.observable().extend({ required: true });
    self.location = ko.observable().extend({ required: true });
    self.date = ko.observable().extend({ required: true });
    self.time = ko.observable().extend({ required: true });
    self.participants = ko.observable(8);
    self.chainaccept = ko.observable(false);
    
    // retrieve categories if category list is empty
    if (self.categories().length === 0) {
      webapi.Get('api/category').done(function (result) {
        self.categories(result);

        // set the default value
        self.category(self.categories()[0]);
      });
    }

    var validationGroup = ko.validatedObservable({
      category: self.category,
      description: self.description,
      location: self.location,
      date: self.date,
      time: self.time,
      participants: self.participants,
      chainaccept: self.chainaccept
    });
    
    // add the activity to the back-end
    self.addActivity = function () {

      var result = ko.validation.group(self, { deep: true });

      if (!self.isValid()) {
        result.showAllMessages(true);
        return false;
      }

      if (validationGroup.isValid) {

        // build the data for the post
        var data = getModelData();

        webapi.Post('api/activity', data).done(function () {

          toastr["info"]("You've just created activity for " +
          self.date().format("YYYY-MMM-DD") + " " + self.time().format("HH:mm") + " at " + self.location(),
          "Activity created");

          resetModel();
        }).error(function () {
          toastr["error"]("Something went wrong. Please try again at a later time");

          resetModel();
        });

        return true;
      }
    };

    var getModelData = function () {
      return {
        Category: self.category(),
        Date: self.date().format('YYYY-MM-DD') + ' ' + self.time().format('HH:mm'),
        Location: self.location(),
        Content: self.description(),
        ProfileId: 42,
        MaxParticipants: self.participants(),
        ChainAccept: self.chainaccept()
      };
    }

    // resets the model to it's initial state
    var resetModel = function () {
      // set the viewmodel fields to initialize values
      self.description(undefined);
      self.location(undefined);
      self.date(undefined);
      self.time(undefined);
      self.participants(8);
      self.category(self.categories()[0]);
      self.chainaccept(false);

      // reset the knockout validation
      self.description.isModified(false);
      self.location.isModified(false);
      self.date.isModified(false);
      self.time.isModified(false);
    }
  }

  AddActivityModel.prototype.dispose = function () {
    ko.utils.arrayForEach(this.disposables, function (item) {
      item.dispose();
    });
  }

  return new AddActivityModel();

})