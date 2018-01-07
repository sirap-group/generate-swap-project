import isValid from 'is-valid-app'

import { task } from '../../utils/utils'
import Logger from '../../utils/Logger'

import generateDefaults from 'generate-defaults'

const log = new Logger('generate-swap-editorconfig')

export default function (app) {
  if (!isValid(app, 'generate-swap-editorconfig')) return

  app.on('error', ::log.error)

  app.use(generateDefaults)

  /**
   * Write a `.editorconfig` file to the current working directory.
   *
   * ```sh
   * $ gen swap-package:editorconfig
   * ```
   * @name editorconfig
   * @api public
   */
  task(app, 'editorconfig', 'generate-swap-editorconfig/_editorconfig')

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
  app.task('default', ['editorconfig'])
}
