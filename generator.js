'use strict';

var isValid = require('is-valid-app');
var extend = require('extend');
var path = require('path')

module.exports = function(app) {
  if (!isValid(app, 'generate-swap-project')) return;

  /**
   * Plugins
   */

  app.use(require('generate-defaults'));

  /**
   * Scaffold out a(n) swap-project project. Also aliased as the [default](#default) task.
   *
   * ```sh
   * $ gen swap-project:swap-project
   * ```
   * @name swap-project
   * @api public
   */

  app.task('swap-project', ['testfile']);

  /**
   * Write a `test-file.txt` file to the current working directory.
   *
   * ```sh
   * $ gen swap-project:file
   * ```
   * @name file
   * @api public
   */

  task(app, 'testfile', 'test-file.txt');


  /**
   * Scaffold out a new swap-project project. This task is an alias for the [swap-project](#swap-project)
   * task, to allow running this generator with the following command:
   *
   * ```sh
   * $ gen swap-project
   * ```
   * @name default
   * @api public
   */

  app.task('default', ['swap-project']);
};

/**
 * Create a task with the given `name` and glob `pattern`
 */

function task(app, name, pattern, dependencies) {
  app.task(name, dependencies || [], function(cb) {
    return file(app, pattern);
  });
}

function file(app, pattern) {
  var opts = extend({}, app.base.options, app.options);
  var srcBase = opts.srcBase || path.join(__dirname, 'templates');
  return app.src(pattern, {cwd: srcBase})
    .pipe(app.renderFile('*', app.base.cache.data))
    .pipe(app.conflicts(app.cwd))
    .pipe(app.dest(app.cwd));
}