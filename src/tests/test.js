import 'mocha'
import fs from 'fs'
import path from 'path'
import assert from 'assert'
import generate from 'generate'
import npm from 'npm-install-global'
import del from 'delete'
import pkg from '../package'
import generator from '..'
let app

const isTravis = process.env.CI || process.env.TRAVIS
// const fixtures = path.resolve.bind(path, __dirname, 'fixtures')
const actual = path.resolve.bind(path, __dirname, 'actual')

function exists (name, cb) {
  return function (err) {
    if (err) return cb(err)
    const filepath = actual(name)

    fs.stat(filepath, function (err, stat) {
      if (err) return cb(err)
      assert(stat)
      del(actual(), cb)
    })
  }
}

describe('generate-swap-project', function () {
  this.slow(250)

  if (!process.env.CI && !process.env.TRAVIS) {
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
      assert(app.tasks.hasOwnProperty('default'))
      assert(app.tasks.hasOwnProperty('swap-project'))
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
      if (isTravis) {
        this.skip()
        return
      }
      app.use(generator)
      app.generate('generate-swap-project', exists('test-file.txt', cb))
    })

    it('should run the default task using the `swap-project` generator alias (local generator.js)', function (cb) {
      if (isTravis) {
        this.skip()
        return
      }
      app.use(generator)
      app.generate('swap-project', exists('test-file.txt', cb))
    })
  })

  describe('swap-project (API)', function () {
    it('should run the default task on the generator', function (cb) {
      app.register('swap-project', generator)
      app.generate('swap-project', exists('test-file.txt', cb))
    })

    it('should run the `swap-project` task', function (cb) {
      app.register('swap-project', generator)
      app.generate('swap-project:swap-project', exists('test-file.txt', cb))
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

    it('should run the `generator:swap-project` task', function (cb) {
      app.register('foo', function (foo) {
        foo.register('swap-project', generator)
      })
      app.generate('foo.swap-project:swap-project', exists('test-file.txt', cb))
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
    app.option('dest', actual())

    // see: https://github.com/jonschlinkert/ask-when
    app.option('askWhen', 'not-answered')

    // set default data to use in templates. feel free to remove anything
    // that isn't used (e.g. if "username" isn't defined in templates, just remove it)
    app.data(pkg)
    app.data('project', pkg)
    app.data('username', 'foo')
    app.data('owner', 'foo')
  }
})
