import isValid from 'is-valid-app'

import Logger from './utils/Logger'
// import { task } from './utils/utils'

import generateDefaults from 'generate-defaults'
import generateDest from 'generate-dest'
import generateGit from 'generate-git'

import generatePackage from './subgenerators/generate-swap-package/generator'
import generateGitignore from './subgenerators/generate-swap-gitignore/generator'
import generateGitattributes from './subgenerators/generate-swap-gitattributes/generator'
import generateEditorconfig from './subgenerators/generate-swap-editorconfig/generator'
import generateNpmrc from './subgenerators/generate-swap-npmrc/generator'
import generateContributing from './subgenerators/generate-swap-contributing/generator'
import generateLicense from './subgenerators/generate-swap-license/generator'
import generateMain from './subgenerators/generate-swap-main/generator'
import generateReadme from './subgenerators/generate-swap-readme/generator'
import generateTravis from './subgenerators/generate-swap-travis/generator'
import generateGitlabci from './subgenerators/generate-swap-gitlabci/generator'

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
  app.register('gitattributes', generateGitattributes)
  app.register('editorconfig', generateEditorconfig)
  app.register('npmrc', generateNpmrc)
  app.register('contributing', generateContributing)
  app.register('license', generateLicense)
  app.register('main', generateMain)
  app.register('readme', generateReadme)
  app.register('travis', generateTravis)
  app.register('gitlabci', generateGitlabci)

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
      'dest',
      'package',
      'gitignore',
      'gitattributes',
      'editorconfig',
      'npmrc',
      'contributing',
      'license',
      'main',
      'readme',
      'travis',
      'gitlabci',
      'git:default'
    ], cb)
  })

  /**
   * Ask the user for all the required data for all the tasks in this generator.
   *
   * ```sh
   * $ gen swap-project:prompt
   * ```
   * @name prompt
   * @api public
   */
  app.task('prompt', promptTask(app))

  /**
   * Set the destination directory for generated files.
   * Call the `destination-directory:default` task from the sub generator `destination-directory`.
   *
   * ```sh
   * $ gen swap-project:dest
   * ```
   * @name dest
   * @api public
   */
  app.task('dest', function (cb) {
    app.generate(['destination-directory:default'], cb)
  })

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
   * Write a `.gitignore` file to the current working directory.
   * Call the `gitignore:default` task from the sub generator `generate-swap-gitignore`.
   *
   * ```sh
   * $ gen swap-project:gitignore
   * ```
   * @name gitignore
   * @api public
   */
  app.task('gitignore', function (cb) {
    app.generate(['gitignore:default'], cb)
  })

  /**
   * Write a `.gitattributes` file to the current working directory.
   * Call the `gitattributes:default` task from the sub generator `generate-swap-gitattributes`.
   *
   * ```sh
   * $ gen swap-project:gitattributes
   * ```
   * @name gitattributes
   * @api public
   */
  app.task('gitattributes', function (cb) {
    app.generate(['gitattributes:default'], cb)
  })

  /**
   * Write a `.editorconfig` file to the current working directory.
   * Call the `editorconfig:default` task from the sub generator `generate-swap-editorconfig`.
   *
   * ```sh
   * $ gen swap-project:editorconfig
   * ```
   * @name editorconfig
   * @api public
   */
  app.task('editorconfig', function (cb) {
    app.generate(['editorconfig:default'], cb)
  })

  /**
   * Write a `.npmrc` file to the current working directory.
   * Call the `npmrc:default` task from the sub generator `generate-swap-npmrc`.
   *
   * ```sh
   * $ gen swap-project:npmrc
   * ```
   * @name npmrc
   * @api public
   */
  app.task('npmrc', function (cb) {
    app.generate(['npmrc:default'], cb)
  })

  /**
   * Write a `contributing.md` file to the current working directory.
   * Call the `contributing:default` task from the sub generator `generate-swap-contributing`.
   *
   * ```sh
   * $ gen swap-project:contributing
   * ```
   * @name contributing
   * @api public
   */
  app.task('contributing', function (cb) {
    app.generate(['contributing:default'], cb)
  })

  /**
   * Write a `LICENSE` file to the current working directory.
   * Call the `license:default` task from the sub generator `generate-swap-license`.
   *
   * ```sh
   * $ gen swap-project:license
   * ```
   * @name license
   * @api public
   */
  app.task('license', function (cb) {
    app.generate(['license:default'], cb)
  })

  /**
   * Write the following three files to the current working directory:
   * - ./index.js
   * - ./src/lib/index.js
   * - ./src/tests/index.test.js
   *
   * ```sh
   * $ gen swap-project:main
   * ```
   * @name license
   * @api public
   */
  app.task('main', function (cb) {
    app.generate(['main:default'], cb)
  })

  /**
   * Write a `README.md` file to the current working directory and copy the required assets images to `src/assets/img`.
   * Call the `readme:default` task from the sub generator `generate-swap-readme`.
   *
   * ```sh
   * $ gen swap-project:readme
   * ```
   * @name readme
   * @api public
   */
  app.task('readme', function (cb) {
    app.generate(['readme:default'], cb)
  })

  /**
   * Write a `.travis.yml` file to the current working directory.
   * Call the `travis:default` task from the sub generator `generate-swap-travis`.
   *
   * ```sh
   * $ gen swap-project:travis
   * ```
   *
   * @name travis
   * @api public
   */
  app.task('travis', function (cb) {
    app.generate(['travis:default'], cb)
  })

  /**
   * Write a `.gitlabci.yml` file to the current working directory.
   * Call the `gitlabci:default` task from the sub generator `generate-swap-gitlabci`.
   *
   * ```sh
   * $ gen swap-project:gitlabci
   * ```
   *
   * @name gitlabci
   * @api public
   */
  app.task('gitlabci', function (cb) {
    app.generate(['gitlabci:default'], cb)
  })

  /**
   * Scaffold out a new swap-project project. This task is an alias for the [swap-project](#swap-project)
   * task, to allow running this generator with the following command:
   *
   * ```sh
   * $ gen swap-project:default
   * ```
   *
   * or simply
   *
   * ```sh
   * $ gen swap-project
   * ```
   * @name default
   * @api public
   */
  app.task('default', ['project'])
}
