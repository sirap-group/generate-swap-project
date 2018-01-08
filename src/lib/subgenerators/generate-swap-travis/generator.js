import isValid from 'is-valid-app'

import { task } from '../../utils/utils'
import Logger from '../../utils/Logger'

import generateDefaults from 'generate-defaults'

const log = new Logger('generate-swap-travis')

export default function (app) {
  if (!isValid(app, 'generate-swap-travis')) return

  app.on('error', ::log.error)

  app.use(generateDefaults)

  /**
   * Write a `.travis` file to the current working directory.
   *
   * ```sh
   * $ gen swap-travis:travis
   * ```
   * @name travis
   * @api public
   */
  task(app, 'travis', 'generate-swap-travis/_travis.yml')

  /**
   * Run the `default` task
   *
   * ```sh
   * $ gen swap-travis:default
   * ```
   *
   * or simply
   *
   * ```sh
   * $ gen swap-travis
   * ```
   *
   * @name default
   * @api public
   */
  app.task('default', ['travis'])
}
