---
layout: false
rename:
  basename: 'scripts/gulp-tasks/watch.js'
---
const debug = require('debug')
const chalk = require('chalk')
const path = require('path')
const gulp = require('gulp')
const watch = require('gulp-watch')
const shell = require('shelljs')

const dbug = debug('swap:scripts:watch')

// Change working dir to come back to the project root
const workingDir = path.resolve(path.join(__dirname, '../../'))
process.chdir(workingDir)

const watchFiles = [
  // 'package.json', // once task splitted
  'src/**/*'// ,
  // 'src/assets/**/*.*'
  // 'scripts/**/*.js' // once task splitted
]

const watchOptions = {
  ignoreInitial: true, // default
  events: ['add', 'change', 'unlink'], // default
  // events: ['add', 'change', 'unlink', 'addDir', 'unlinkDir', 'error', 'ready', 'raw'] // all
  base: workingDir,
  name: 'watcher-all-src',
  verbose: true,
  readDelay: 10, // default
  read: false
}

/**
 * Watch all js files in src and run `pipeline:tests` on any change
 * @todo split it to several tasks for each kind of source files (src/lib, src/tests, src/docs, scripts, package.json)
 */

gulp.task('watch:bdd', function (done) {
  dbug('Building source code...')
  shell.exec('DEBUG_COLORS=true yarn pipeline:tests --color always', err => {
    if (err) {
      dbug('Building source code... ERROR.')
      console.log(chalk.red('Build error. Skip next tasks and wait for new changes.'))
    } else {
      dbug('Building source code... OK.')
    }

    dbug('Start watching for ever...')
    watcher()
  })
})

gulp.task('default', ['watch:bdd'])

function watcher () {
  dbug('Watching files...')
  watch(watchFiles, watchOptions, file => {
    dbug('A file has just changed:', file.path)
    dbug('Running onWatch task list...')

    const sourceFilePath = file.path
    dbug(`Linting file <%= unescapeTemplateLitterals(#{sourceFilePath}) %>...`)

    shell.exec(`yarn standard <%= unescapeTemplateLitterals(#{sourceFilePath}) %> --color always`, err => {
      if (err) {
        dbug(chalk.red(`Linting file <%= unescapeTemplateLitterals(#{sourceFilePath}) %>... ERROR.`))
        console.error(chalk.red('Lint error. Skip next tasks and wait for new changes.'))
      } else {
        dbug(`Linting file <%= unescapeTemplateLitterals(#{sourceFilePath}) %>... OK.`)

        const destFilePath = sourceFilePath.replace('/src/', '/dist/')
        dbug(`Transpiling file <%= unescapeTemplateLitterals(#{sourceFilePath}) %> to ${destFilePath}...`)
        shell.exec(`yarn babel <%= unescapeTemplateLitterals(#{sourceFilePath}) %> --out-file ${destFilePath} --color always`, err => {
          if (err) {
            dbug(`Transpiling file <%= unescapeTemplateLitterals(#{sourceFilePath}) %> to ${destFilePath}... ERROR.`)
            console.error(chalk.red('Transpiling error. Skip next tasks and wait for new changes.'))
          } else {
            dbug(`Transpiling file <%= unescapeTemplateLitterals(#{sourceFilePath}) %> to ${destFilePath}... OK.`)

            dbug('Running all tests suite...')
            shell.exec(`DEBUG_COLORS=true yarn test --color always`, err => {
              if (err) {
                dbug(chalk.red('Unit test suite has failed. Wait for new changes for passing tests.'))
                console.error(chalk.red('Unit test suite has failed. Wait for new changes for passing tests.'))
              }
              dbug(chalk.green('Great, all tests passed !'))
              dbug('Running all tests suite... OK.')
              dbug('Running onWatch task list... OK.')
            })
          }
        })
      }
    })
  })
}

