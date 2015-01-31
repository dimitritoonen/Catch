var gulp = require('gulp');
var glob = require('glob');
var replace = require('gulp-replace');

/*
  Replaces the RequireJS bundles as they are not replace by rev-collect because the
    RequireJS bundles are configure without .js in it's file name. 

  Consider this a temporary HACK. Read more below:
  https://gist.github.com/CodeXT1/890d0e990d5e2bd1e8fe
*/

gulp.task('revision:requireJs:collect', function () {

  return gulp.src(['./build/publish/scripts-*.js'])

    .pipe(replace(/\"([^"]*)\"\:\s?\[\s*\"/g, function (match, p1) {
      
      // Glob assign all *.js files in publish directory that have already been revisioned
      var allRevFiles = glob.sync('./build/publish/*.js');

      // Turn the JSON glob into a jsonString
      var jsonString = JSON.stringify(allRevFiles);

      // this RegEx has two Capture groups with () inside () if you notice:
      // one with the full file name and hash, without the .js, what we want it to turn into
      // and one with just the file name, no hash and no .js, what it currently is, and what
      // is currently being stored in the "p1" variable to be matched against later
      var regEx = /\"\.\/[a-z]*\/[a-z]*\/(([^\"\/]*)-[a-z0-9-]*)\.js\"/ig

      // Define a single plainFile to loop with, and a allPlainFiles array to push results into
      var plainFile;
      var allPlainFiles = [];

      // loop through the matching RegEx compared to all our hashed *.js files in Build Dir 
      // to build our array
      while (plainFile = regEx.exec(jsonString)) {

        // Push Capture group 1 and 2 into the array
        allPlainFiles.push(plainFile[2]);
        allPlainFiles.push(plainFile[1]);
      };

      // simple loop over the size of the allPlainFiles Array
      for (var i = 0; i < allPlainFiles.length; i++) {
        // if the Capture group 2 matches the "p1" found in the file, replace it with Capture
        // group 1's related full filename, the one with the hash added so +1 in
        // the Array compared to the one the matched so we replace it with what we want.

        if (allPlainFiles[i] === p1) {

          // return it with extra formatting because the first RegEx we did removes some extra
          // characters with its matching due to having to match against extra symbols like ":[
          // in order to make sure the bundle names it found were unique in the fully concatenated
          // common bundle scripts*.js file, because there are other libraries in there too now.
          // So Add back in a starting "  and a closing ":[
          return "\"" + allPlainFiles[i + 1] + "\"\:\[\"";
        }
      };


    }))
     //This is final pipe writes the changes to Scripts*.js with gulp-replace to change the
     //desired bundle names to the hashed versions. It all takes about 40ms to finish, great hack.
    .pipe(gulp.dest('./build/publish'));

});