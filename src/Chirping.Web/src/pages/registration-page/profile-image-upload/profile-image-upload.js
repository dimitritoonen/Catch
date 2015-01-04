define(['knockout', 'bootstrap-dialog', 'text!./profile-image-upload.html', 'services/chunked-uploader', 'jcrop'],
  function (ko, bootstrapDialog, templateMarkup, ChunkedUploader) {

  function ProfileImageUpload(params) {
    
    var self = this;

    // defines the jcrop object to retrieve the selected cropping coordinates from
    var jcropApi;
    var image = new Image();
    var canvas = document.createElement('canvas');

    self.identifier = params.identifier;
    self.profileImage = params.profileImage;
    self.profileImageCrop = params.profileImageCrop;

    // ensure that input type[file] component has an unique identifier
    $('#wizard-profileFile').attr('id', 'wizard-profileFile' + self.identifier);
    $('#loadingIconBackground').attr('id', 'loadingIconBackground' + self.identifier);

    //$('#wizard-profile-upload-form').attr('id', 'wizard-profile-upload-form' + self.identifier);
    //$('#wizard-profileFile' + self.identifier).on('change', onFileSelected);

    // opens a open file dialog 
    self.openFileDialog = function () {
      $('#wizard-profileFile' + self.identifier).trigger('click');
    };


    /**
     * Utility method to format bytes into the most logical magnitude (KB, MB,
     * or GB).
     */
    //Number.prototype.formatBytes = function () {
    //  var units = ['B', 'KB', 'MB', 'GB', 'TB'],
    //      bytes = this,
    //      i;

    //  for (i = 0; bytes >= 1024 && i < 4; i++) {
    //    bytes /= 1024;
    //  }

    //  return bytes.toFixed(2) + units[i];
    //};



    function toggleLoadingIcon() {

      var $element = $('#loadingIconBackground' + self.identifier);

      if ($element.hasClass('visibility-hide'))
        $element.removeClass('visibility-hide');
      else
        $element.addClass('visibility-hide');
    };


    //var uploaders = [];
    //var upload_form = $('#wizard-profile-upload-form' + self.identifier)
    //upload_form.on('submit', onFormSubmit);

    //function onFileSelected(e) {
    //  var file = e.target.files[0];

    //  uploaders.push(new ChunkedUploader(file));

    //  $('#wizard-profile-upload-form' + self.identifier).submit();
    //};

    //function onFormSubmit(e) {

    //  toggleLoadingIcon();

    //  $.each(uploaders, function (i, uploader) {
    //    uploader.start(displayImageInDialog);
    //  });

    //  uploaders = [];

    //  // Prevent default form submission
    //  e.preventDefault();
    //};


    // display the select image by the user in a dialog where the image can be cropped
    self.displayImage = function (element) {

      toggleLoadingIcon();

      displayImageInDialog(element);

    }; // self.displayImage


    function displayImageInDialog(element) {
    //function displayImageInDialog(file) {
      
      if (window.File && window.FileReader && window.FileList && window.Blob) {

        // get file and reset input type=[file] html object so that the same file can be selected again
        var file = element.files[0];
        $('#wizard-profileFile' + self.identifier).val('');

        loadSelectedImage(file);

      } else {

        alert('The File APIs are not fully supported in this browser.');
      }


      // load the image the user selected 
      function loadSelectedImage(file) {
        
        var reader = new FileReader();
        reader.onload = (function (theFile) {

          return function (e) {
            
            //image = new Image();
            image.src = e.target.result;
            image.onload = function () {

              displayImageInDialog(image);

              drawImage(image);
            };
          };

        })(file);
        reader.readAsDataURL(file);

      }; // loadSelectedImage()


      // display a dialog box in which the user can crop the image
      function displayImageInDialog(file) {

        var dialog = new bootstrapDialog({
          animate: false,
          closeByKeyboard: false,
          message: getBaseMessage(),
          buttons: defineDialogButtons()
        });

        // create the dialog
        dialog.realize();

        resizeDialog(dialog);

        dialog.getModalHeader().hide();
        dialog.open();
      }; // displayImageInDialog


      function resizeDialog(dialog) {

        var maxWindowWidth = getMaxWindowWidth();
        var maxWindowHeight = getMaxWindowHeight();
        
        // if height exceeeds max windows height, calculate width based on max window height
        if (image.height > image.width && image.height > maxWindowHeight) {
          var width = (image.width / image.height) * maxWindowHeight;
          dialog.getModalBody().css('width', width);
          dialog.getModalDialog().css('width', width);
        }
        // define the max width (60% of window) of the dialog box when selecting a large image        
        else if (image.width > 500 && image.width < maxWindowWidth) {
          dialog.getModalBody().css('width', image.width);
          dialog.getModalDialog().css('width', image.width);
        }
        else if (image.width > maxWindowWidth) {
          dialog.getModalBody().css('width', maxWindowWidth);
          dialog.getModalDialog().css('width', maxWindowWidth);
        }
      }; // resizeDialog()

      // get the max window width
      function getMaxWindowWidth() {
        return ($(window).width() * .6);
      };

      // get the max window height
      function getMaxWindowHeight() {
        return ($(window).height() * .85);
      };

      function getBaseMessage() {

        // define the html to display in the modal dialog
        var $message = $('<div id="wizard-dialogProfileContainer">');
        $message.append('</div>');
        $message.append('<br />Drag the border to cut the image');
        return $message;
      };


      // defines the buttons visible on the modal dialog
      function defineDialogButtons() {
        return [{
          label: 'Cancel',
          action: function (dialog) {
            dialog.close();
          }
        }, {
          label: 'Finished cropping',
          cssClass: 'btn-primary',
          action: storeImageOnClose
        }];
      };

      // store image in view model
      function storeImageOnClose(dialog) {
        var selection = jcropApi.tellSelect();
        canvas.width = canvas.height = 800;

        var img = $('#wizard-dialogProfileImage')[0];

        var ctx = canvas.getContext('2d');
        ctx.drawImage(img, selection.x, selection.y, selection.w, selection.h, 0, 0, canvas.width, canvas.height);

        // store the resized and cropped image
        self.profileImage(canvas.toDataURL());

        // save image to registration page and close dialog
        dialog.close();
      };

      // use the canvas object to draw the image in the modal dialog
      function drawImage(image) {

        // get the visible height of the canvas
        var dimensions = getCanvasDimensions(image);
        canvas.width = dimensions.width;
        canvas.height = dimensions.height;

        // draw the image within the canvas
        var ctx = canvas.getContext('2d');
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

        // write the original image to an <img html object
        $('#wizard-dialogProfileContainer').html(['<img id="wizard-dialogProfileImage" src="', canvas.toDataURL(), '"/>'].join(''));

        // configure Jcrop on the image
        $('#wizard-dialogProfileImage').Jcrop({
          bgColor: 'black',
          bgOpacity: .6,
          setSelect: [0, 0, 0, image.width],
          aspectRatio: 1,
        }, function () {
          jcropApi = this;
        });

        toggleLoadingIcon();

      }; // drawImage()


      // define the max width and height based on the width of the modal dialog
      function getCanvasDimensions(image) {

        var containerWidth = $('#wizard-dialogProfileContainer').width();
        var height = width = containerWidth;
        height = width * (image.height / image.width);
        return { height: height, width: width };
      }; // getCanvasDimensions()
    };
  }

  // This runs when the component is torn down. Put here any logic necessary to clean up,
  // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
  ProfileImageUpload.prototype.dispose = function() { };
  
  return { viewModel: ProfileImageUpload, template: templateMarkup };

});
