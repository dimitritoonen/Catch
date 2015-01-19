define(['knockout', 'bootstrap-dialog', 'text!./profile-image-upload.html', 'jcrop'], function (ko, bootstrapDialog, templateMarkup, jcrop) {

    function ProfileImageUpload(params) {
    
      var self = this;

      self.identifier = params.identifier === null ? 1: params.identifier;
      self.profileImage = params.profileImage;
      self.profileImageCrop = params.profileImageCrop;

      self.displayImage = function (element) {

        console.log('test');

      }; // self.displayImage

      // opens a open file dialog 
      self.openFileDialog = function () {

        console.log($('#wizard-profileFile' + self.identifier));
        $('#wizard-profileFile' + self.identifier).trigger('click');
      };
    }

    return { viewModel: ProfileImageUpload, template: templateMarkup };

});
