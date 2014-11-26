define(['jquery'], function ($) {

  function ChunkedUploader(file, options) {
    if (!this instanceof ChunkedUploader) {
      return new ChunkedUploader(file, options);
    }

    this.file = file;

    this.options = $.extend({
      url: '/upload'
    }, options);

    this.file_size = this.file.size;
    this.chunk_size = (1024 * 100); // 100KB
    this.range_start = 0;
    this.range_end = this.chunk_size;

    if ('mozSlice' in this.file) {
      this.slice_method = 'mozSlice';
    }
    else if ('webkitSlice' in this.file) {
      this.slice_method = 'webkitSlice';
    }
    else {
      this.slice_method = 'slice';
    }

    this.upload_request = new XMLHttpRequest();
    this.upload_request.onload = this._onChunkComplete;
    
    this._onUploadComplete = function () {

      var blob = new Blob(totalUpload, { type: file.type });
      var reader = new FileReader();
      reader.readAsBinaryString(blob);

      ChunkedUploader.callbackOnDone(blob);
      
      totalUpload = [];
    };
  }

  this.totalUpload = [];

  ChunkedUploader.prototype = {

    // Internal Methods __________________________________________________

    _upload: function () {
      var self = this;
      var chunk;

      // set timeout to create the async illusion
      setTimeout(function () {

        // Prevent range overflow
        if (self.range_end > self.file_size) {
          self.range_end = self.file_size;
        }

        chunk = self.file[self.slice_method](self.range_start, self.range_end);

        totalUpload.push(chunk);

        self._onChunkComplete();

      }, 20);
    },

    // Event Handlers ____________________________________________________

    _onChunkComplete: function () {
      // If the end range is already the same size as our file, we
      // can assume that our last chunk has been processed and exit
      // out of the function.
      if (this.range_end === this.file_size) {
        this._onUploadComplete();
        return;
      }

      // Update our ranges
      this.range_start = this.range_end;
      this.range_end = this.range_start + this.chunk_size;

      // Continue as long as we aren't paused
      if (!this.is_paused) {
        this._upload();
      }
    },


    callbackOnDone: null,

    // Public Methods ____________________________________________________

    start: function (callbackOnDone) {
      ChunkedUploader.callbackOnDone = callbackOnDone;
      this._upload();
    },

    pause: function () {
      this.is_paused = true;
    },

    resume: function () {
      this.is_paused = false;
      this._upload();
    }
  };

  return ChunkedUploader;
});