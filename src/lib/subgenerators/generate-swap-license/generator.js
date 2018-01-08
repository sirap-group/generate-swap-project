import path from 'path'
import extend from 'extend'
import isValid from 'is-valid-app'

import Logger from '../../utils/Logger'

import generateDefaults from 'generate-defaults'

const log = new Logger('generate-swap-license')

export default function (app) {
  if (!isValid(app, 'generate-swap-license')) return

  app.on('error', ::log.error)

  app.use(generateDefaults)

  /**
   * Write a `LICENSE` file to the current working directory.
   * Available licenses: MIT or Private
   *
   * ```sh
   * $ gen swap-license:license
   * ```
   * @name license
   * @api public
   * @todo add more license types
   * @todo need a prompt task for `license` (`app.base.cache.data.license`)
   */
  app.task('license', () => {
    const opts = extend({}, app.base.options, app.options)
    const srcBase = opts.srcBase || path.join(__dirname, '../../assets/templates')
    const templateName = app.base.cache.data.license === 'MIT' ? 'license-mit' : 'license-private'
    return app.src(`generate-swap-license/${templateName}`, {cwd: srcBase})
      .pipe(app.renderFile('*', app.base.cache.data))
      .pipe(app.conflicts(app.cwd))
      .pipe(app.dest(app.cwd))
  })

  /**
   * Run the `default` task
   *
   * ```sh
   * $ gen swap-license
   * ```
   *
   * or
   *
   * ```sh
   * $ gen swap-license:default
   * ```
   *
   * @name default
   * @api public
   */
  app.task('default', ['license'])
}
