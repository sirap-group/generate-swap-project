import path from 'path'
import extend from 'extend'
import isValid from 'is-valid-app'
import helperDate from 'helper-date'
// import copy from 'copy'

import { task } from '../../utils/utils'
import { camelcaseHelper } from '../../utils/helpers'
import Logger from '../../utils/Logger'

import generateDefaults from 'generate-defaults'

const log = new Logger('generate-swap-readme')

export default function (app) {
  if (!isValid(app, 'generate-swap-readme')) return

  app.on('error', ::log.error)

  app.helper('date', helperDate)
  app.helper('camelcase', camelcaseHelper)

  app.use(generateDefaults)

  /**
   * Write a `README.md` file to the current working directory.
   *
   * ```sh
   * $ gen swap-readme:readme
   * ```
   * @name readme
   * @api public
   */
  task(app, 'readme', 'generate-swap-readme/readme.md')

  /**
   * Write required assets images to src/assets/img
   *
   * ```sh
   * $ gen swap-readme:readme
   * ```
   * @name readme
   * @api public
   */
  app.task('assets', done => {
    const opts = extend({}, app.base.options, app.options)
    const srcBase = opts.srcBase || path.join(__dirname, '../../../assets')
    const dest = path.join(app.cwd, 'src/assets/img')

    console.log({ dest, srcBase })
    // copy('../../../assets/img/*', dest, done)
    return app.src('img/*', {cwd: srcBase})
    .pipe(app.dest(dest))
  })

  /**
   * Run the `default` task (assets, readme)
   *
   * ```sh
   * $ gen swap-readme
   * ```
   *
   * or
   *
   * ```sh
   * $ gen swap-readme:default
   * ```
   *
   * @name default
   * @api public
   */
  app.task('default', ['assets', 'readme'])
}
