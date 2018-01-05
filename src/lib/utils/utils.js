import path from 'path'
import extend from 'extend'

export { task, file }

/**
 * Create a task that write a file with the given `name` and glob `pattern`
 */

function task (app, name, pattern, dependencies) {
  app.task(name, dependencies || [], cb => file(app, pattern))
}

function file (app, pattern) {
  const opts = extend({}, app.base.options, app.options)
  const srcBase = opts.srcBase || path.join(__dirname, '../../assets/templates')
  return app.src(pattern, {cwd: srcBase})
    .pipe(app.renderFile('*', app.base.cache.data))
    .pipe(app.conflicts(app.cwd))
    .pipe(app.dest(app.cwd))
}
