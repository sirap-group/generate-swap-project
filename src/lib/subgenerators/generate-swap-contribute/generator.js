import isValid from 'is-valid-app'

import { task } from '../../utils/utils'
import Logger from '../../utils/Logger'

import generateDefaults from 'generate-defaults'

const log = new Logger('generate-swap-contribute')

export default function (app) {
  if (!isValid(app, 'generate-swap-contribute')) return

  app.on('error', ::log.error)

  app.use(generateDefaults)

  /**
   * Write a `.contribute` file to the current working directory.
   *
   * ```sh
   * $ gen swap-contribute:contribute
   * ```
   * @name contribute
   * @api public
   */
  task(app, 'contribute', 'generate-swap-contribute/contribute.md')

  /**
   * Run the `default` task
   *
   * ```sh
   * $ gen swap-contribute
   * ```
   *
   * or
   *
   * ```sh
   * $ gen swap-contribute:default
   * ```
   *
   * @name default
   * @api public
   */
  app.task('default', ['contribute'])
}
