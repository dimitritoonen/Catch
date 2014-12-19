var requireDir = require('require-dir');

/* specify the task to use for publication to acceptance and production */
requireDir('./gulp/tasks');
requireDir('./gulp/tasks/acceptance-build');
requireDir('./gulp/tasks/dev-build');
requireDir('./gulp/tasks/dev-optimized-build');
requireDir('./gulp/tasks/prod-build');