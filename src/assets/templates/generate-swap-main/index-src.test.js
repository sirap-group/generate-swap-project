---
layout: false
rename:
  basename: 'src/tests/index.test.js'
---
import 'mocha'
import path from 'path'
import chai from 'chai'
import debug from 'debug'

import DemoClass from '../lib/'


const expect = chai.expect

const isCI = process.env.CI
const isTravis = isCI || process.env.TRAVIS
// const fixtures = path.resolve.bind(path, __dirname, 'fixtures')
// const testFolder = path.resolve.bind(path, __dirname, 'actual')

const d = debug('BDD')
d('starting')

let demoObj


/**
 * @test <%= name %>
 */
describe('<%= name %>', () => {
  this.slow(250)

  if (isCI || isTravis) {
    before(done => {
      const contextLabel = isTravis? 'travis' : 'CI'
      d(`${contextLabel} test running`)
      done()
    })
  }

  beforeEach(done => {
    demoObj = new DemoClass()
    done()
  })

  afterEach(done => {
    // destroy things
    done()
  })

  /**
   * @test DemoClass
   */
  describe('DemoClass', () => {
    it('should be a valid class', () => {
      expect(DemoClass).to.be.a('function')
      expect(DemoClass).to.have.a.property('prototype')
      expect(DemoClass.prototype).to.be.an('object')
    })
    it('should have a `concatenate` method', done => {
      expect(DemoClass.prototype).to.have.a.property('concatenate')
      expect(DemoClass.prototype.concatenate).to.be.a('function')
    })

    /**
     * @test instance
     */
    describe('instance', () => {
      it('should be an instance of DemoClass', () => {
        expect(demoObj).to.be.an('object')
        expect(demoObj).to.be.an.instanceOf(DemoClass)
      })
      it('should have a `propA` string property equal to A', done => {
        expect(demoObj).to.have.a.property('propA')
        expect(demoObj.propA).to.be.a('string')
        expect(demoObj.propA).to.equal('A')
      })
      it('should have a `propB` string property equal to B', done => {
        expect(demoObj).to.have.a.property('propB')
        expect(demoObj.propB).to.be.a('string')
        expect(demoObj.propB).to.equal('B')
      })
    })

    /**
     * @test #concatenate()
     */
    describe('#concatenante', () => {
      it('should concatenante demoObj.propA and demoObj.propB', () => {
        let ret = demoObj.concatenate()
        expect(ret).to.be.a('string')
        expect(ret).to.equal('AB')
      })
    })
  })
})

d('finished')
