# browser-sync-instance

Require an instance of [BrowserSync](https://github.com/shakyShane/browser-sync), instead of a singleton.

## Install

```
npm install --save-dev basham/browser-sync-instance
```

## Options

### Default

```js
browserSyncInstance();
```

Return an anonymous instance of BrowserSync.

### Name (string)

```js
browserSyncInstance(name);
```

Create or find an instance of BrowserSync with the given unique name. This is especially useful if the instance is defined in one task, yet it's referenced in another.

## Usage

```js
// ./tasks/browser-sync.js
var gulp = require('gulp');
var browserSyncInstance = require('browser-sync-instance');
var browserSyncAssets = browserSyncInstance();
var browserSyncProxy = browserSyncInstance('proxy');

gulp.task('browser-sync', function() {

  browserSyncAssets({
    server: {
      baseDir: './src/'
    },
    open: false
  });

  browserSyncProxy({
    proxy: 'localhost:8080',
    port: 4000
  });

});
```

```js
// ./tasks/styles.js
var gulp = require('gulp');
var browserSyncProxy = require('browser-sync-instance')('proxy');

gulp.task('styles', function() {
  return gulp.src('src/**/*.css')
    .pipe(browserSyncProxy.reload({ stream: true }));
});
```

```js
// ./tasks/watch.js
var gulp = require('gulp');

gulp.task('watch', ['browser-sync'], function() {
  gulp.watch('src/**/*.css', ['styles']);
});
```

```js
// ./tasks/default.js
var gulp = require('gulp');

gulp.task('default', ['watch']);
```
