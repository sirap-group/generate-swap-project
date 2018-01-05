const path = require('path')

const gulp = require('gulp')
const bump = require('gulp-bump')
const shell = require('shelljs')
const runSequence = require('run-sequence')
const jsonfile = require('jsonfile')
const chalk = require('chalk')

// Change working dir to come back to the project root
const workingDir = path.resolve(path.join(__dirname, '../../'))
process.chdir(workingDir)

const packageFilePath = './package.json'
let packageTag

gulp.task('default', ['release:test'])

/**
 * Build Alias Task
 */
gulp.task('build', done => {
  shell.exec('yarn pipeline', done)
})

/**
 * Yarn Publish Task
 */
gulp.task('publish', done => {
  shell.exec(`yarn publish . --new-version ${packageTag}`, done)
})

/**
 * Git Is Repo Clean Task
 */
gulp.task('gitIsRepoClean', done => {
  shell.exec('git diff --exit-code > /dev/null && git diff --exit-code > /dev/null --cached', err => {
    if (err) {
      done(chalk.red('Git repository is not clean. Please commit or stash your changes before trying to release a new version.'))
    } else {
      console.log(chalk.green('Your git repository is clean. Ok to continue.'))
      done()
    }
  })
})

/**
 * Get tag from package file
 */
gulp.task('getPackageTag', done => {
  jsonfile.readFile(packageFilePath, (err, pkg) => {
    if (err) {
      done(err)
    } else {
      packageTag = pkg.version
      done()
    }
  })
})

/**
 * Git Commit Package.json Task
 */
gulp.task('gitCommitPackage', done => {
  shell.exec(`git add ${packageFilePath}`, err => {
    if (err) {
      done(err)
    } else {
      shell.exec(`git commit -m "Release v${packageTag}"`, done)
    }
  })
})

/**
 * Git Tag Task
 */
gulp.task('gitTag', done => {
  shell.exec(`git tag v${packageTag}`, done)
})

/**
 * Git Push Task
 */
gulp.task('gitPush', done => {
  shell.exec(`git push origin $(git name-rev --name-only HEAD)`, err => {
    if (err) {
      done(err)
    } else {
      shell.exec(`git push origin v${packageTag}`, done)
    }
  })
})

/**
 * Bump Prerelease Task
 */
gulp.task('bump:prerelease', done => {
  gulp.src(packageFilePath)
  .pipe(bump({type: 'prerelease'}))
  .pipe(gulp.dest('./'))
  .on('error', done)
  .on('finish', done)
})

/**
 * Bump Patch Task
 */
gulp.task('bump:patch', done => {
  gulp.src(packageFilePath)
  .pipe(bump({type: 'patch'}))
  .pipe(gulp.dest('./'))
  .on('error', done)
  .on('finish', done)
})

/**
 * Bump Minor Task
 */
gulp.task('bump:minor', done => {
  gulp.src(packageFilePath)
  .pipe(bump({type: 'minor'}))
  .pipe(gulp.dest('./'))
  .on('error', done)
  .on('finish', done)
})

/**
 * Bump Major Task
 */
gulp.task('bump:major', done => {
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
  runSequence('gitIsRepoClean', 'build', 'bump:prerelease', 'getPackageTag', 'gitCommitPackage', 'gitTag', 'gitPush', 'publish', done)
})

/**
 * Release Path Task
 */
gulp.task('release:patch', done => {
  runSequence('gitIsRepoClean', 'build', 'bump:patch', 'getPackageTag', 'gitCommitPackage', 'gitTag', 'gitPush', 'publish', done)
})

/**
 * Release Minor Task
 */
gulp.task('release:minor', done => {
  runSequence('gitIsRepoClean', 'build', 'bump:minor', 'getPackageTag', 'gitCommitPackage', 'gitTag', 'gitPush', 'publish', done)
})

/**
 * Release Major Task
 */
gulp.task('release:major', done => {
  runSequence('gitIsRepoClean', 'build', 'bump:major', 'getPackageTag', 'gitCommitPackage', 'gitTag', 'gitPush', 'publish', done)
})
