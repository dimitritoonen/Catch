var gulp = require('gulp');
var shell = require('gulp-shell');

// Generate fonts with FontCustom
gulp.task('fontcustom', shell.task([
  'fontcustom compile'
]));