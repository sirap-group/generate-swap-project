import isValid from 'is-valid-app'
import extend from 'extend'
import path from 'path'
import Logger from './utils/Logger'

import generateDefaults from 'generate-defaults'
import generateDest from 'generate-dest'

const log = new Logger('generate-swap-project')

export default function (app) {
  if (!isValid(app, 'generate-swap-project')) return

  /**
   * Listen for errors
   */
  app.on('error', ::log.error)

  /**
   * Plugins
   */

  app.use(generateDefaults)

  /**
   * Micro generators (as plugins)
   */
  app.register('destination-directory', generateDest)

  /**
   * Scaffold out a(n) swap-project project. Also aliased as the [default](#default) task.
   *
   * ```sh
   * $ gen swap-project:project
   * ```
   * @name project
   * @api public
   */

  app.task('project', function (cb) {
    app.generate(['destination-directory:default', 'testfile'], cb)
  })

  /**
   * Write a `test-file.txt` file to the current working directory.
   *
   * ```sh
   * $ gen swap-project:file
   * ```
   * @name file
   * @api public
   */

  task(app, 'testfile', 'test-file.txt')

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

  app.task('default', ['project'])
}

/**
 * Create a task with the given `name` and glob `pattern`
 */

function task (app, name, pattern, dependencies) {
  app.task(name, dependencies || [], cb => file(app, pattern))
}

function file (app, pattern) {
  const opts = extend({}, app.base.options, app.options)
  const srcBase = opts.srcBase || path.join(__dirname, '..', '..', 'templates')
  return app.src(pattern, {cwd: srcBase})
    .pipe(app.renderFile('*', app.base.cache.data))
    .pipe(app.conflicts(app.cwd))
    .pipe(app.dest(app.cwd))
}
