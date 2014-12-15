var _ = require('underscore');

// underscore extender method:
// description: returns the path without the filename
_.mixin({
  getPathWithoutFileName: function (path) {
    var indexOf = path.lastIndexOf('/');
    return path.substring(0, indexOf);
  }
});
