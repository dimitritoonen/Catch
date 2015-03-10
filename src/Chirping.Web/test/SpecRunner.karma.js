var tests = [];
for (var file in window.__karma__.files) {
  if (window.__karma__.files.hasOwnProperty(file)) {

    // loads tests from all the folders defines in test (i.e. test/components/*.js, test/models/*.js, etc).
    if (/test\/([a-z]+)\/.*\.js$/.test(file)) {
      tests.push(file);
    }
  }
}

requirejs.config({
    baseUrl: '/base/build',
    deps: tests,
    callback: window.__karma__.start
});
