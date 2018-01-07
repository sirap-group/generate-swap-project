'use strict'

const generator = require('./')
const trees = require('verb-trees')
const del = require('delete')
const generateReadme = require('verb-generate-readme')

/**
 * Build docs: `$ verb`
 *
 * (verb takes ~2 sec to run, since it has to
 * run all of the tasks to create file trees)
 */

module.exports = app => {
  app.use(generateReadme)

  app.option('check-directory', false)
  app.option('overwrite', true)
  app.option('prompt', false)

  app.use(trees(generator, [
    'default',
    'project',
    'prompt',
    'dest',
    'package',
    'gitignore',
    'gitattributes',
    'editorconfig',
    'git:default'
  ]))

  app.task('docs', done => {
    app.src('docs/trees.md', {cwd: __dirname})
    .pipe(app.renderFile('*'))
    .pipe(app.dest(app.cwd))
    .on('error', done)
    .on('finish', done)
  })

  app.task('delete', done => {
    del('.temp-trees', done)
  })

  app.task('default', ['trees', 'readme', 'docs', 'delete'])
}
