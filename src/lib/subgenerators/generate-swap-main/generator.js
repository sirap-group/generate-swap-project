import isValid from 'is-valid-app'

import { task } from '../../utils/utils'
import Logger from '../../utils/Logger'

import generateDefaults from 'generate-defaults'

const log = new Logger('generate-swap-main')

export default function (app) {
  if (!isValid(app, 'generate-swap-main')) return

  app.on('error', ::log.error)

  app.use(generateDefaults)

  /**
   * Write the following three files to the current working directory:
   * - ./index.js
   * - ./src/lib/index.js
   * - ./src/tests/index.test.js
   *
   * ```sh
   * $ gen swap-main:main
   * ```
   * @name main
   * @api public
   */
  app.task('main', ['index-root', 'index-src', 'index-test'])

  /**
   * Create the root index file
   *
   * ```sh
   * $ gen swap-main:index-root
   * ```
   * @name index-root
   * @api public
   */
  task(app, 'index-root', 'generate-swap-main/index-root.js')

  /**
   * Create the src index file
   *
   * ```sh
   * $ gen swap-main:index-src
   * ```
   * @name index-src
   * @api public
   */
  task(app, 'index-src', 'generate-swap-main/index-src.js')

  /**
   * Create the test index file
   *
   * ```sh
   * $ gen swap-main:index-test
   * ```
   * @name index-test
   * @api public
   */
  task(app, 'index-test', 'generate-swap-main/index-test.js')

  /**
   * Run the `default` task
   *
   * ```sh
   * $ gen swap-main
   * ```
   *
   * or
   *
   * ```sh
   * $ gen swap-main:default
   * ```
   *
   * @name default
   * @api public
   */
  app.task('default', ['main'])
}
