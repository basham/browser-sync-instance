# browser-sync-instance

Require an instance of [BrowserSync](https://github.com/shakyShane/browser-sync), instead of a singleton.

## Install

```
npm install --save-dev basham/browser-sync-instance
```

## Usage

```js
var gulp = require('gulp');
var browserSyncInstance = require('browser-sync-instance');
var bsAssets = browserSyncInstance();
var bsProxy = browserSyncInstance();

gulp.task('browser-sync', function() {

  bsAssets({
    server: {
      baseDir: './src/'
    },
    open: false
  });

  bsProxy({
    proxy: 'localhost:8080',
    port: 4000
  });

});

gulp.task('reload', function() {
  bsProxy.reload();
});

gulp.task('watch', ['browser-sync'], function() {
  gulp.watch('src/**/*.css', ['reload']);
});

gulp.task('default', ['watch']);
```
