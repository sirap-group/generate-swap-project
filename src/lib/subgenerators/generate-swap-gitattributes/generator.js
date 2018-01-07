import isValid from 'is-valid-app'

import { task } from '../../utils/utils'
import Logger from '../../utils/Logger'

import generateDefaults from 'generate-defaults'

const log = new Logger('generate-swap-gitattributes')

export default function (app) {
  if (!isValid(app, 'generate-swap-gitattributes')) return

  app.on('error', ::log.error)

  app.use(generateDefaults)

  /**
   * Write a `.gitattributes` file to the current working directory.
   *
   * ```sh
   * $ gen swap-package:gitattributes
   * ```
   * @name gitattributes
   * @api public
   */
  task(app, 'gitattributes', 'generate-swap-gitattributes/_gitattributes')

  /**
   * Run the `default` task
   *
   * ```sh
   * $ gen swap-project
   * ```
   *
   * or
   *
   * ```sh
   * $ gen swap-project:default
   * ```
   *
   * @name default
   * @api public
   */
  app.task('default', ['gitattributes'])
}
