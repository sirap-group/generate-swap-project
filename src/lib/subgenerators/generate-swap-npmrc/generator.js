import isValid from 'is-valid-app'

import { task } from '../../utils/utils'
import Logger from '../../utils/Logger'

import generateDefaults from 'generate-defaults'

const log = new Logger('generate-swap-npmrc')

export default function (app) {
  if (!isValid(app, 'generate-swap-npmrc')) return

  app.on('error', ::log.error)

  app.use(generateDefaults)

  /**
   * Write a `.npmrc` file to the current working directory.
   *
   * ```sh
   * $ gen swap-npmrc:npmrc
   * ```
   * @name npmrc
   * @api public
   */
  task(app, 'npmrc', 'generate-swap-npmrc/_npmrc')

  /**
   * Run the `default` task
   *
   * ```sh
   * $ gen swap-npmrc:default
   * ```
   *
   * or simply
   *
   * ```sh
   * $ gen swap-npmrc
   * ```
   *
   * @name default
   * @api public
   */
  app.task('default', ['npmrc'])
}
