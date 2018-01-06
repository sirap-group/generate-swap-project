import isValid from 'is-valid-app'

import Logger from './utils/Logger'
// import { task } from './utils/utils'

import generateDefaults from 'generate-defaults'
import generateDest from 'generate-dest'
import generateGit from 'generate-git'

import generatePackage from './subgenerators/generate-swap-package/generator'
import generateGitignore from './subgenerators/generate-swap-gitignore/generator'

import promptTask from './tasks/prompt'

const log = new Logger('generate-swap-project')

export default function (app) {
  if (!isValid(app, 'generate-swap-project')) return

  app.on('error', ::log.error)

  /**
   * Plugins
   */
  app.use(generateDefaults)

  /**
   * Micro generators (as plugins)
   */
  app.register('destination-directory', generateDest)
  app.register('git', generateGit)
  app.register('package', generatePackage)
  app.register('gitignore', generateGitignore)

  /**
   * Scaffold out a(n) swap-project project. Also aliased as the [default](#default) task.
   *
   * ```sh
   * $ gen swap-project:project
   * ```
   * @name project
   * @api public
   */

  app.task('project', function (cb) {
    app.generate([
      'prompt',
      'destination-directory:default',
      'package',
      'git:default'
    ], cb)
  })

  app.task('prompt', promptTask(app))

  /**
   * Write a `package.json` file to the current working directory.
   * Call the `package:default` task from the sub generator `generate-swap-package`.
   *
   * ```sh
   * $ gen swap-project:package
   * ```
   * @name package
   * @api public
   */
  app.task('package', function (cb) {
    app.generate(['package:default'], cb)
  })

  /**
   * Scaffold out a new swap-project project. This task is an alias for the [swap-project](#swap-project)
   * task, to allow running this generator with the following command:
   *
   * ```sh
   * $ gen swap-project
   * ```
   * @name default
   * @api public
   */
  app.task('default', ['project'])
}
