import isValid from 'is-valid-app'

import { task } from '../../utils/utils'
import Logger from '../../utils/Logger'

import generateDefaults from 'generate-defaults'

const log = new Logger('generate-swap-contributing')

export default function (app) {
  if (!isValid(app, 'generate-swap-contributing')) return

  app.on('error', ::log.error)

  app.use(generateDefaults)

  /**
   * Write a `CONTRIBUTING.md` file to the current working directory.
   *
   * ```sh
   * $ gen swap-contributing:contributing
   * ```
   * @name contributing
   * @api public
   */
  task(app, 'contributing', 'generate-swap-contributing/contributing.md')

  /**
   * Run the `default` task
   *
   * ```sh
   * $ gen swap-contributing
   * ```
   *
   * or
   *
   * ```sh
   * $ gen swap-contributing:default
   * ```
   *
   * @name default
   * @api public
   */
  app.task('default', ['contributing'])
}
