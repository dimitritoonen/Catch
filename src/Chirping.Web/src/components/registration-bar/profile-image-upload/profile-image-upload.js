define(['knockout', 'bootstrap-dialog', 'text!./profile-image-upload.html', 'jcrop'], function (ko, bootstrapDialog, templateMarkup, jcrop) {

  function ProfileImageUpload(params) {
    
    var self = this;

    // defines the jcrop object to retrieve the selected cropping coordinates from
    //var jcropApi;
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


    // display the select image by the user in a dialog where the image can be cropped
    self.openImage = function (element) {
            
      toggleLoadingIcon();

      displayImageInDialog(element);

    };

    // display/hide the loading icon 
    function toggleLoadingIcon() {

      var $element = $('#loadingIconBackground' + self.identifier);

      if ($element.hasClass('visibility-hide'))
        $element.removeClass('visibility-hide');
      else
        $element.addClass('visibility-hide');
    }


    // shows the selected image in a modal dialog
    function displayImageInDialog(element) {
      if (window.File && window.FileReader && window.FileList && window.Blob) {

        // get file and reset input type=[file] html object so that the same file can be selected again
        var file = element.files[0];
        $('#wizard-profileFile' + self.identifier).val('');

        loadSelectedImage(file);

      } else {

        alert('The File APIs are not fully supported in this browser.');
      }
    } // displayImageInDialog


    // load the image the user selected 
    function loadSelectedImage(file) {

      var reader = new FileReader();
      reader.onload = (function (theFile) {

        return function (e) {

          image.src = e.target.result;
          image.onload = function () {
            
            displayDialog(image);
          };
        };

      })(file);
      reader.readAsDataURL(file);

    } // loadSelectedImage()

    
    // display a dialog box in which the user can crop the image
    function displayDialog(file) {

      var dialog = new bootstrapDialog({
        animate: true,
        closeByBackdrop: false,
        closeByKeyboard: false,
        cssClass: 'modal-header-grey',
        message: function(dialogRef) {
          var $message = $('<div id="wizard-dialogProfileContainer">');
          $message.append('</div>');
          $message.append('<br /><div class="modal-body-text">Drag the border to cut the image</div>');
          return $message;
        },
        buttons: [{
            label: 'Cancel',
            action: function (dialog) {
              dialog.close();
            }
          }, {
            label: 'Finished cropping',
            cssClass: 'btn-primary',
            action: storeImageOnClose
          }],
        onshown: function (dialogRef) {
          drawImage(image);
        }
      });

      // create the dialog
      dialog.realize();

      dialog.getModalHeader().css('color', 'black');
                  
      resizeDialog(dialog);
      dialog.open();
    } // displayImageInDialog

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
    } // resizeDialog()

    // get the max window width
    function getMaxWindowWidth() {
      return ($(window).width() * 0.6);
    }

    // get the max window height
    function getMaxWindowHeight() {
      return ($(window).height() * 0.85);
    }


    // store image in view model
    function storeImageOnClose(dialog) {
      var selection = jcropApi.tellSelect();
      canvas.width = canvas.height = 800;

      var img = $('#wizard-dialogProfileImage')[0];

      var ctx = canvas.getContext('2d');
      ctx.drawImage(img, selection.x, selection.y, selection.w, selection.h, 0, 0, canvas.width, canvas.height);

      // store the resized and cropped image
      self.profileImage(canvas.toDataURL());

      console.log(canvas.toDataURL('image/jpeg', 0.9).split(',')[1]);

      // save image to registration page and close dialog
      dialog.close();
    }


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
      $('#wizard-dialogProfileContainer').before(['<img id="wizard-dialogProfileImage" src="', canvas.toDataURL(), '"/>'].join(''));

      // configure Jcrop on the image
      $('#wizard-dialogProfileImage').Jcrop({
        bgColor: 'black',
        bgOpacity: 0.6,
        minSize: [100, 100],
        setSelect: [0, 0, 0, 300],
        aspectRatio: 1,
      }, function () {
        jcropApi = this;
      });

      toggleLoadingIcon();

    } // drawImage()

    // define the max width and height based on the width of the modal dialog
    function getCanvasDimensions(image) {

      var containerWidth = $('#wizard-dialogProfileContainer').width();
      var height = containerWidth;
      var width = containerWidth;
      height = width * (image.height / image.width);
      return { height: height, width: width };
    }
  }


  return { viewModel: ProfileImageUpload, template: templateMarkup };

});