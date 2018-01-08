import isValid from 'is-valid-app'

import { task } from '../../utils/utils'
import Logger from '../../utils/Logger'

import generateDefaults from 'generate-defaults'

const log = new Logger('generate-swap-gitlabci')

export default function (app) {
  if (!isValid(app, 'generate-swap-gitlabci')) return

  app.on('error', ::log.error)

  app.use(generateDefaults)

  /**
   * Write a `.gitlabci` file to the current working directory.
   *
   * ```sh
   * $ gen swap-gitlabci:gitlabci
   * ```
   * @name gitlabci
   * @api public
   */
  task(app, 'gitlabci', 'generate-swap-gitlabci/_gitlab-ci.yml')

  /**
   * Run the `default` task
   *
   * ```sh
   * $ gen swap-gitlabci:default
   * ```
   *
   * or simply
   *
   * ```sh
   * $ gen swap-gitlabci
   * ```
   *
   * @name default
   * @api public
   */
  app.task('default', ['gitlabci'])
}
