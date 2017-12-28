import 'mocha'
import assert from 'assert'
import generate from 'generate'

import generator from '../lib/generator'

let app

describe('generate-swap-project', function () {
  beforeEach(function () {
    app = generate()
  })

  describe('plugin', function () {
    it('should add tasks to the instance', function () {
      app.use(generator)
      assert(app.tasks.hasOwnProperty('default'))
      assert(app.tasks.hasOwnProperty('swap-project'))
    })

    it('should only register the plugin once', function (cb) {
      let count = 0
      app.on('plugin', function (name) {
        if (name === 'generate-swap-project') {
          count++
        }
      })
      app.use(generator)
      app.use(generator)
      app.use(generator)
      assert.equal(count, 1)
      cb()
    })
  })
})
