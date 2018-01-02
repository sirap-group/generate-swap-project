const gulp = require('gulp')
const bump = require('gulp-bump')
const shell = require('shelljs')
const runSequence = require('run-sequence')
const jsonfile = require('jsonfile')

// Change working dir to come back to the project root
const workingDir = '../../'
process.chdir(workingDir)

const packageFilePath = './package.json'

gulp.task('default', ['release:test'])

/**
 * Build Alias Task
 */
gulp.task('build', (done) => {
  shell.exec('yarn pipeline', done)
})

/**
 * Yarn Publish Task
 */
gulp.task('publish', (done) => {
  jsonfile.readFile(packageFilePath, (err, pkg) => {
    if (err) {
      done(err)
    } else {
      shell.exec('yarn publish . --new-version ' + pkg.version, done)
    }
  })
})

/**
 * Git Tag Task
 */
gulp.task('gitTag', (done) => {
  jsonfile.readFile(packageFilePath, (err, pkg) => {
    if (err) {
      done(err)
    } else {
      shell.exec('git tag v' + pkg.version, done)
    }
  })
})

/**
 * Git Push Task
 */
gulp.task('gitPush', (done) => {
  shell.exec('git push --tags origin', done)
})

/**
 * Bump Prerelease Task
 */
gulp.task('bump:prerelease', (done) => {
  gulp.src(packageFilePath)
  .pipe(bump({type: 'prerelease'}))
  .pipe(gulp.dest('./'))
  .on('error', done)
  .on('finish', done)
})

/**
 * Bump Patch Task
 */
gulp.task('bump:patch', (done) => {
  gulp.src(packageFilePath)
  .pipe(bump({type: 'patch'}))
  .pipe(gulp.dest('./'))
  .on('error', done)
  .on('finish', done)
})

/**
 * Bump Minor Task
 */
gulp.task('bump:minor', (done) => {
  gulp.src(packageFilePath)
  .pipe(bump({type: 'minor'}))
  .pipe(gulp.dest('./'))
  .on('error', done)
  .on('finish', done)
})

/**
 * Bump Major Task
 */
gulp.task('bump:major', (done) => {
  gulp.src(packageFilePath)
  .pipe(bump({type: 'major'}))
  .pipe(gulp.dest('./'))
  .on('error', done)
  .on('finish', done)
})

/**
 * Release Prerelease Task
 */
gulp.task('release:prerelease', done => {
  runSequence('build', 'bump:prerelease', 'gitTag', 'gitPush', 'publish', done)
})

/**
 * Release Path Task
 */
gulp.task('release:patch', done => {
  runSequence('build', 'bump:patch', 'gitTag', 'gitPush', 'publish', done)
})

/**
 * Release Minor Task
 */
gulp.task('release:minor', done => {
  runSequence('build', 'bump:minor', 'gitTag', 'gitPush', 'publish', done)
})

/**
 * Release Major Task
 */
gulp.task('release:major', done => {
  runSequence('build', 'bump:major', 'gitTag', 'gitPush', 'publish', done)
})
