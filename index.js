#! /usr/bin/env node
"use strict";

/**
 * @module BrowserSync
 */

var pjson         = require("./node_modules/browser-sync/package.json");

var BrowserSync   = require("./node_modules/browser-sync/lib/browser-sync");
var utils         = require("./node_modules/browser-sync/lib/utils");
var cli           = require("./node_modules/browser-sync/lib/cli/index");
var init          = cli.init;
var info          = cli.info;

var argv          = process.argv;
var args          = require("./node_modules/browser-sync/node_modules/minimist")(argv.slice(2));

function instance() {

  var _this = {};

  var browserSync   = new BrowserSync();

  /**
   * Handle Command-line usage
   */
  /*
  if (require.main === module) {

      init.parse(pjson.version, args, argv, function (err, data) {

          if (err) {
              utils.fail(err, {}, true);
          }
          if (data.config) {
              _start(data.files, data.config);
          }
          if (data.configFile) {
              info.makeConfig();
          }
      });
  }
  */

  /**
   * @method browserSync
   * @param {Object} [config] This is the main configuration for your BrowserSync instance and can contain any of the [available options]({{site.links.options}})
   *  If you do not pass a config an argument for configuration, BrowserSync will still run; but it will be in the `snippet` mode
   * @param {Function} [cb] If you pass a callback function, it will be called when BrowserSync has completed all setup tasks and is ready to use. This
   * is useful when you need to wait for information (for example: urls, port etc) or perform other tasks synchronously.
   * @returns {BrowserSync}
   */
  var publicInit      = require("./node_modules/browser-sync/lib/public/init")(_start);

  _this      = publicInit;
  _this.init = publicInit;

  /**
   * @param {Array|Null} files
   * @param {Object} config
   * @param {Function} [cb]
   * @returns {BrowserSync}
   */
  function _start(files, config, cb) {
      return browserSync.init(files || [], config, pjson.version, cb);
  }

  /**
   * The `reload` method will inform all browsers about changed files and will either cause the browser to refresh, or inject the files where possible.
   *
   * @method reload
   * @param {String|Array|Object} [arg] The file or files to be reloaded. For
   * details and examples of Streams support, please see the [GulpJS]({{site.links.gulp}}) examples
   * @returns {*}
   */
  _this.reload = require("./node_modules/browser-sync/lib/public/reload")(browserSync);

  /**
   * A simple true/false flag that you can use to determine if there's a currently-running BrowserSync instance.
   *
   * @property active
   */
  /*
  Object.defineProperty(this, "active", {
      get: function () {
          return browserSync.active;
      }
  });
  */

  /**
   * Helper method for browser notifications
   *
   * @method notify
   * @param {String|HTML} msg Can be a simple message such as 'Connected' or HTML
   * @param {Number} [timeout] How long the message will remain in the browser. @since 1.3.0
   */
  _this.notify = require("./node_modules/browser-sync/lib/public/notify")(browserSync);

  /**
   * Register a plugin. Must implement at least a 'plugin' method that returns a
   * callable function.
   *
   * @method use
   * @param {String} name The name of the plugin
   * @param {Object} module The object to be `required`.
   * @param {Function} [cb] A callback function that will return any errors.
   */
  _this.use = browserSync.registerPlugin.bind(browserSync);

  /**
   * The internal Event Emitter used by the running BrowserSync instance (if there is one).
   * You can use this to emit your own events, such as changed files, logging etc.
   *
   * @property emitter
   * @type Events.EventEmitter
   */
  _this.emitter = browserSync.events;

  /**
   * This method will close any running server, stop file watching & exit the current process.
   *
   * @method exit
   */
  _this.exit = require("./node_modules/browser-sync/lib/public/exit")(browserSync);

  return _this;
}

module.exports = instance;
