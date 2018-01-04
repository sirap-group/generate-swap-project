import isValid from 'is-valid-app'
import helperDate from 'helper-date'

import promptTask from '../../tasks/prompt'

import { task } from '../../utils/utils'
import { escapeQuotes } from '../../utils/helpers'
import Logger from '../../utils/Logger'

import generateDefaults from 'generate-defaults'

const log = new Logger('generate-swap-package')

export default function (app) {
  if (!isValid(app, 'generate-swap-package')) return

  app.on('error', ::log.error)

  app.helper('date', helperDate)
  app.helper('escapeQuotes', escapeQuotes)

  app.use(generateDefaults)

  app.task('prompt', promptTask(app))

  /**
   * Write a `package.json` file to the current working directory.
   *
   * ```sh
   * $ gen swap-package:package
   * ```
   * @name file
   * @api public
   */
  task(app, 'package', 'generate-swap-package/$package.json')

  /**
   * Run the `package` task
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
   * @name file
   * @api public
   */
  app.task('default', ['prompt', 'package'])
}
