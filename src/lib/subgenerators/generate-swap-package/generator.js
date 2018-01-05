import isValid from 'is-valid-app'
import helperDate from 'helper-date'

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

  app.postRender(/package\.json$/, (file, next) => {
    if (!file.basename === 'package.json') {
      next()
      return
    }

    const pkg = JSON.parse(file.content)
    if (app.options.private) {
      pkg.private = true
    }
    pkg.files = pkg.files.split(',')

    file.contents = Buffer.from(JSON.stringify(pkg, null, 2))
    next()
  })

  app.use(generateDefaults)

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
  app.task('default', ['package'])
}
