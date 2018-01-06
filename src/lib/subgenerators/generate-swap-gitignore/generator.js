import isValid from 'is-valid-app'

import { task } from '../../utils/utils'
import Logger from '../../utils/Logger'

import generateDefaults from 'generate-defaults'

const log = new Logger('generate-swap-gitignore')

export default function (app) {
  if (!isValid(app, 'generate-swap-package')) return

  app.on('error', ::log.error)

  // app.postRender(/package\.json$/, packagePostRender(app))

  app.use(generateDefaults)

  /**
   * Write a `.gitignore` file to the current working directory.
   *
   * ```sh
   * $ gen swap-package:gitignore
   * ```
   * @name gitignore
   * @api public
   */
  task(app, 'gitignore', 'generate-swap-gitignore/_gitignore')

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
  app.task('default', ['gitignore'])
}
