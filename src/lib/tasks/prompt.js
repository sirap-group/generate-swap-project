/**
 * Prompts for commonly used data. This task isn't necessary
 * needed, it's more of a convenience for asking questions up front,
 * instead of as files are generated. The actual messages for questions
 * can be found in the [common-questions][] library.
 *
 * ```sh
 * $ gen project:prompt
 * ```
 * @name project:prompt
 * @api public
 */
export default app => {
  return done => {
    if (app.options.prompt === false) return done()
    app.base.data(app.cache.data)

    app.base.set('cache.prompted', true)
    app.question('homepage', 'Project homepage ?')
    app.question('customfield', 'Champ Perso ?')

    // common question names
    var keys = mapValues([
      'name',
      'description',
      'owner',
      'homepage',
      'license',
      'author.name',
      'author.username',
      'author.url',
      'customfield'
    ], app)

    if (keys.skip.length) {
      app.log()
      app.log('', app.log.yellow(app.log.bold(app.log.underline('Heads up!'))))
      app.log()
      app.log(' The following data from user environment and/or package.json')
      app.log(' will be used to render templates (if applicable), and prompts')
      app.log(' for these values will be skipped:')
      app.log()
      app.log(formatFields(app, keys.skip))
      app.log(` Run with ${app.log.cyan('--noskip')} to disable this feature.`)
      app.log()
      app.log(' ---')
      app.log()
    }

    app.ask(keys.ask, done)
  }
}

/**
 * Map values and filter out keys for data that has already been defined,
 * to avoid asking unnecessary questions. This can be overridden
 * with `--noskip`
 * @todo enable correct `skipCondition`
 */
function mapValues (keys, app) {
  // Always SKIP because of bad yielding of some values (owner, homepage, username...)
  const skipCondition = true
  // const skipCondition = app.option('hints') === false || app.option('skip') === false
  if (skipCondition) {
    return {ask: keys, skip: []}
  }

  var res = {ask: [], skip: []}
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i]
    if (!app.has('cache.data', key)) {
      res.ask.push(key)
    } else {
      app.base.data(key, app.data(key))
      res.skip.push([key, app.data(key)])
    }
  }
  return res
}

/**
 * Format skipped fields
 */
function formatFields (app, keys) {
  var list = ''
  keys.forEach(key => {
    list += '  · ' + app.log.bold(key[0])
    list += ': ' + app.log.green(key[1]) + '\n'
  })
  return list
}
