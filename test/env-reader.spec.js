'use strict';

var envReader = require('../index.js')
  , expect    = require('chai').expect
  , env

describe('env-reader module', function () {

  describe('reading env vars', function () {

    it('should handle string input', function (done) {
      env = envReader().on('data', function (datum) {
        expect(datum).to.equal('test=test')
        done()
      })
      env.write('test=test')
    })

    it('should handle buffer input', function (done) {
      env = envReader().on('data', function (datum) {
        expect(datum).to.equal('test=test')
        done()
      })
      env.write(new Buffer('test=test', 'utf8'))
    })

    it('should skip blank lines', function (done) {
      env = envReader().on('data', function (datum) {
        expect(datum).to.equal('test=test')
        done()
      })
      env.write(new Buffer('\n   \ntest=test', 'utf8'))
    })

    it('should skip comment lines', function (done) {
      env = envReader().on('data', function (datum) {
        expect(datum).to.equal('test=test')
        done()
      })
      env.write(new Buffer('\n #asd  \n   \ntest=test', 'utf8'))
    })

    it('should skip lines with = as the first non space character', function (done) {
      env = envReader().on('data', function (datum) {
        expect(datum).to.equal('test=test')
        done()
      })
      env.write(new Buffer('\n #asd  \n  =asd \ntest=test', 'utf8'))
    })

    it('should skip lines without an = character', function (done) {
      env = envReader().on('data', function (datum) {
        expect(datum).to.equal('test=test')
        done()
      })
      env.write(new Buffer('\n #asd  \n  asd \ntest=test', 'utf8'))
    })

    it('should trim whitespace where possible', function (done) {
      env = envReader().on('data', function (datum) {
        expect(datum).to.equal('test=test')
        done()
      })
      env.write(new Buffer('\n  test  =  test  \n', 'utf8'))
    })

    it('should trim the optional export keyword', function (done) {
      env = envReader().on('data', function (datum) {
        expect(datum).to.equal('test=test')
        done()
      })
      env.write(new Buffer('export test=test', 'utf8'))
    })

    it('should trim the export keyword and whitespace', function (done) {
      env = envReader().on('data', function (datum) {
        expect(datum).to.equal('test=test')
        done()
      })
      env.write(new Buffer('  export  test  =  test  \n', 'utf8'))
    })

  })
})
