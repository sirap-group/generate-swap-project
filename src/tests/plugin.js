import 'mocha'
import chai from 'chai'
import generate from 'generate'

import generator from '../lib/generator'

let app

const expect = chai.expect

describe('generate-swap-project', function () {
  beforeEach(function () {
    app = generate()
  })

  describe('plugin', function () {
    it('should add tasks to the instance', function () {
      app.use(generator)
      expect(app.tasks).has.property('default')
      expect(app.tasks).has.property('project')
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
      expect(count).to.equal(1)
      cb()
    })
  })
})
