import isValid from 'is-valid-app'

import { task } from '../../utils/utils'
import Logger from '../../utils/Logger'

import generateDefaults from 'generate-defaults'

const log = new Logger('generate-swap-license')

export default function (app) {
  if (!isValid(app, 'generate-swap-license')) return

  app.on('error', ::log.error)

  app.use(generateDefaults)

  /**
   * Write a `.license` file to the current working directory.
   *
   * ```sh
   * $ gen swap-license:license
   * ```
   * @name license
   * @api public
   */
  task(app, 'license', 'generate-swap-license/license.md')

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
