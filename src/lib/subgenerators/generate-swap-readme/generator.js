import isValid from 'is-valid-app'
import helperDate from 'helper-date'

import { task } from '../../utils/utils'
import { camelcaseHelper } from '../../utils/helpers'
import Logger from '../../utils/Logger'

import generateDefaults from 'generate-defaults'

const log = new Logger('generate-swap-readme')

export default function (app) {
  if (!isValid(app, 'generate-swap-readme')) return

  app.on('error', ::log.error)

  app.helper('date', helperDate)
  app.helper('camelcase', camelcaseHelper)

  app.postRender(/readme\.json$/, packagePostRender(app))

  app.use(generateDefaults)

  /**
   * Write a `readme.json` file to the current working directory.
   *
   * ```sh
   * $ gen swap-readme:readme
   * ```
   * @name file
   * @api public
   */
  task(app, 'readme', 'generate-swap-readme/$readme.json')

  /**
   * Run the `readme` task
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
  app.task('default', ['readme'])
}

function packagePostRender (app) {
  return (file, next) => {
    if (!file.basename === 'readme.json') {
      next()
      return
    }

    // Load the readme a an object
    const pkg = JSON.parse(file.content)

    // Set the readme private if --private
    if (app.options.private) {
      pkg.private = true
    }

    // Format readme.json#files as an array
    pkg.files = pkg.files.split(',')
    // Format readme.json#keywords as an array
    pkg.keywords = pkg.keywords.split(',')

    file.contents = Buffer.from(JSON.stringify(pkg, null, 2))
    next()
  }
}
