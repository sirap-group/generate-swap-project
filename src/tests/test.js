import 'mocha'
import fs from 'fs'
import path from 'path'
import chai from 'chai'
import generate from 'generate'
import npm from 'npm-install-global'
import del from 'delete'

import pkg from '../../package'
import generator from '../lib/generator'

let app

const expect = chai.expect
const isCI = process.env.CI
const isTravis = isCI || process.env.TRAVIS
// const fixtures = path.resolve.bind(path, __dirname, 'fixtures')
const actual = path.resolve.bind(path, __dirname, 'actual')

describe('generate-swap-project', function () {
  this.slow(250)

  if (!isCI && !isTravis) {
    before(function (cb) {
      npm.maybeInstall('generate', cb)
    })
  }

  beforeEach(function () {
    beforeEachTest(true, false)
  })

  afterEach(function (cb) {
    del(actual(), cb)
  })

  describe('tasks', function () {
    it('should extend tasks onto the instance', function () {
      app.use(generator)
      expect(app.tasks).has.property('default')
      expect(app.tasks).has.property('project')
    })

    it('should run the `default` task with .build', function (cb) {
      app.use(generator)
      app.build('default', exists('test-file.txt', cb))
    })

    it('should run the `default` task with .generate', function (cb) {
      app.use(generator)
      app.generate('default', exists('test-file.txt', cb))
    })
  })

  describe('swap-project (CLI)', function () {
    it('should run the default task using the `generate-swap-project` name (global install)', function (cb) {
      app.use(generator)
      app.generate('generate-swap-project', exists('test-file.txt', cb))
    })

    it('should run the default task using the `swap-project` generator alias (local generator.js)', function (cb) {
      app.use(generator)
      app.generate('project', exists('test-file.txt', cb))
    })
  })

  describe('swap-project (API)', function () {
    it('should run the default task on the generator', function (cb) {
      app.register('swap-project', generator)
      app.generate('swap-project', exists('test-file.txt', cb))
    })

    it('should run the `swap-project` task', function (cb) {
      app.register('swap-project', generator)
      app.generate('swap-project:project', exists('test-file.txt', cb))
    })

    it('should run the `default` task when defined explicitly', function (cb) {
      app.register('swap-project', generator)
      app.generate('swap-project:default', exists('test-file.txt', cb))
    })
  })

  describe('sub-generator', function () {
    it('should work as a sub-generator', function (cb) {
      app.register('foo', function (foo) {
        foo.register('swap-project', generator)
      })
      app.generate('foo.swap-project', exists('test-file.txt', cb))
    })

    it('should run the `default` task by default', function (cb) {
      app.register('foo', function (foo) {
        foo.register('swap-project', generator)
      })
      app.generate('foo.swap-project', exists('test-file.txt', cb))
    })

    it('should run the `generator:default` task when defined explicitly', function (cb) {
      app.register('foo', function (foo) {
        foo.register('swap-project', generator)
      })
      app.generate('foo.swap-project:default', exists('test-file.txt', cb))
    })

    it('should run the `generator:project` task when defined explicitly', function (cb) {
      app.register('foo', function (foo) {
        foo.register('swap-project', generator)
      })
      app.generate('foo.swap-project:project', exists('test-file.txt', cb))
    })

    it('should work with nested sub-generators', function (cb) {
      app
        .register('foo', generator)
        .register('bar', generator)
        .register('baz', generator)

      app.generate('foo.bar.baz', exists('test-file.txt', cb))
    })

    it('should run tasks as a sub-generator', function (cb) {
      beforeEachTest(true, true)
      const sub0 = app.register('sub0', generator)
      // eslint-disable-next-line no-unused-vars
      const sub1 = sub0.register('sub1', generator)
      app.generate('sub0.sub1:testfile', exists('test-file.txt', cb))
    })
  })

  function beforeEachTest (silent, cli) {
    app = generate({silent, cli})
    app.cwd = actual()

    app.option('prompt', false)
    app.option('check-directory', false)
    app.option('dest', actual())

    // see: https://github.com/jonschlinkert/ask-when
    app.option('askWhen', 'not-answered')

    app.data(pkg)
    app.data('project', pkg)
    app.data('username', 'foo')
    app.data('owner', 'foo')
    app.data('repository', 'http://githost/namespace/repo.git')
    app.data('issues', 'http://githost/namespace/repo/issues')
    app.data('version', 'v5.5.5')
  }
})

function exists (name, cb) {
  return function (err) {
    if (err) return cb(err)
    const filepath = actual(name)

    fs.stat(filepath, function (err, stat) {
      if (err) return cb(err)
      // eslint-disable-next-line no-unused-expressions
      expect(stat).to.exist
      del(actual(), cb)
    })
  }
}
