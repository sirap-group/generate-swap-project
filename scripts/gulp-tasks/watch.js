const path = require('path')

const gulp = require('gulp')
const watch = require('gulp-watch')
const shell = require('shelljs')

// Change working dir to come back to the project root
const workingDir = path.resolve(path.join(__dirname, '../../'))
process.chdir(workingDir)

/**
 * Watch all js files in src and run `pipeline:tests` on any change
 * @todo split it to several tasks for each kind of source files (src/lib, src/tests, src/docs, scripts, package.json)
 */

gulp.task('watch:bdd', function (done) {
  const files = [
    // 'package.json', // once task splitted
    'src/lib/**/*.js',
    'src/tests/**/*.js',
    'src/assets/**/*.*'
    // 'scripts/**/*.js' // once task splitted
  ]

  const options = {
    ignoreInitial: true, // default
    events: ['add', 'change', 'unlink'], // default
    // events: ['add', 'change', 'unlink', 'addDir', 'unlinkDir', 'error', 'ready', 'raw'] // all
    base: workingDir,
    name: 'watcher-all-src',
    verbose: true,
    readDelay: 10, // default
    read: false
  }

  const build = cb => shell.exec('yarn pipeline:tests', cb)

  const onChange = vinyl => {
    build()
  }

  build(() => watch(files, options, onChange))
})

gulp.task('default', ['watch:bdd'])
