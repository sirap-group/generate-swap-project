import isValid from 'is-valid-app'

import { task } from '../../utils/utils'
import Logger from '../../utils/Logger'
import {unescapeTemplateLitterals} from '../../utils/helpers'

import generateDefaults from 'generate-defaults'

const log = new Logger('generate-swap-gitlabci')

export default function (app) {
  if (!isValid(app, 'generate-swap-gitlabci')) return

  app.on('error', ::log.error)

  app.use(generateDefaults)

  app.helper('unescapeTemplateLitterals', unescapeTemplateLitterals)
  // app.postRender(/\.gitlab-ci\.yml$/, postRender(app))

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

function postRender (app) {
  return (file, next) => {
    if (!file.basename === '.gitlab-ci.yml') {
      next()
      return
    }

    let contents
    try {
      contents = String(file.contents)
      contents = contents.replace(/#{/g, '${')
      file.contents = Buffer.from(contents)
    } catch (err) {
      app.log.error('.gitlab-ci.yml post-render hook failed!')
      next(err)
    }

    next()
  }
}
