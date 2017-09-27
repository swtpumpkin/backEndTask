const assert = require('assert')
const request = require('supertest')
const sinon = require('sinon')
const knexCleaner = require('knex-cleaner')

const knex = require('../../src/knex')
const createApp = require('../../src/app')

describe('api', function() {
  beforeEach(function() {
    const postMessage = sinon.spy()
    this.app = createApp({postMessage})
    this.postMessage = postMessage
    return knexCleaner.clean(knex, {'ignoreTables': ['knex_migrations', 'knex_migrations_lock']})
  })

  it('404', function() {
    return request(this.app)
      .get('/api/hahahahah')
      .then(res => {
        assert.equal(res.status, 404)
        assert.equal(res.body.error, 'NotFoundError')
      })
  })

  describe('subscription', function() {
    it('기본 기능', function() {
      return request(this.app)
        .post('/api/subscription')
        .send({email: 'test@example.com'})
        .then(res => {
          assert.equal(res.status, 200)
          assert.equal(res.body.email, 'test@example.com')
          assert.equal(this.postMessage.args[0][0], '새 구독: test@example.com')
        })
    })

    it('이메일 없을 때 에러', function() {
      return request(this.app)
        .post('/api/subscription')
        .send({})
        .then(res => {
          assert.equal(res.status, 400)
          assert.equal(res.body.error, 'InsufficientDataError')
        })
    })

    it('validation 에러', function() {
      return request(this.app)
        .post('/api/subscription')
        .send({email: 'testtest'})
        .then(res => {
          assert.equal(res.status, 400)
          assert.equal(res.body.error, 'ValidationError')
        })
    })

    it.skip('이미 존재하는 이메일에 대해서 에러', function() {
      return request(this.app)
        .post('/api/subscription')
        .send({email: 'test@example.com'})
        .then(res => request(this.app)
          .post('/api/subscription')
          .send({email: 'test@example.com'})
          .then(res => {
            assert.equal(res.status, 400)
            assert.equal(res.status, 'DuplicatedError')
          })
        )
    })
  })

})
