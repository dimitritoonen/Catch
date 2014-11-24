define(['knockout', 'bootstrap-dialog', 'text!./profile-image-upload.html', 'jcrop'], function (ko, bootstrapDialog, templateMarkup) {

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

    // opens a open file dialog 
    self.openFileDialog = function () {
      $('#wizard-profileFile' + self.identifier).trigger('click');
    };


    function toggleLoadingIcon() {

      var $element = $('#loadingIconBackground' + self.identifier);

      if ($element.hasClass('visibility-hide'))
        $element.removeClass('visibility-hide');
      else
        $element.addClass('visibility-hide');
    };

    function async(fn, callback) {
      setTimeout(function () {
        fn();
        callback();
      }, 0);
    }

    // display the select image by the user in a dialog where the image can be cropped
    self.displayImage = function (element) {

      toggleLoadingIcon();

      async(displayImageInDialog(element), function () {
        toggleLoadingIcon();
      });

    }; // self.displayImage


    function displayImageInDialog(element) {

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

        var maxWindowWidth = ($(window).width() * .6);

        // define the max width (60% of window) of the dialog box when selecting a large image        
        if (image.width > 500 && image.width < maxWindowWidth) {
          dialog.getModalBody().css('width', image.width);
          dialog.getModalDialog().css('width', image.width);
        } else if (image.width > maxWindowWidth) {
          dialog.getModalBody().css('width', maxWindowWidth);
          dialog.getModalDialog().css('width', maxWindowWidth);
        }
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
          setSelect: [0, 0, 100, 100],
          aspectRatio: 1,
        }, function () {
          jcropApi = this;
        });

        toggleLoadingIcon();

      }; // drawImage()


      // define the max width and height based on the width of the modal dialog
      function getCanvasDimensions(image) {

        var containerWidth = $('#wizard-dialogProfileContainer').width();

        console.log('container: ' + containerWidth);
        console.log('image: h: ' + image.height + ', w: ' + image.width);

        if (image.height < containerWidth && image.width < containerWidth)
          return { height: image.height, width: image.width };

        var height = width = containerWidth;

        if (image.height > image.width) {
          width = height * (image.width / image.height);
        } else {
          height = width * (image.height / image.width);
        }

        return { height: height, width: width };
      }; // getCanvasDimensions()
    };
  }

  // This runs when the component is torn down. Put here any logic necessary to clean up,
  // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
  ProfileImageUpload.prototype.dispose = function() { };
  
  return { viewModel: ProfileImageUpload, template: templateMarkup };

});
