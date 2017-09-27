const express = require('express')
const bodyParser = require('body-parser')
const validator = require('validator')

const query = require('../query')
const error = require('../error')

module.exports = ({postMessage}) => {
  const router = express.Router()

  router.use(bodyParser.json())

  router.post('/subscription', (req, res, next) => {
    const email = req.body.email
    if (!email) {
      next(new error.InsufficientDataError('email이 필요합니다.'))
    } else if (!validator.isEmail(email)) {
      next(new error.ValidationError('email이 형식에 맞지 않습니다.'))
    } else {
      query.createSubscrption(email)
        .then(([id]) => {
          return query.getSubscriptionById(id)
        })
        .then(subscription => {
          res.send(subscription)
          postMessage(`새 구독: ${email}`)
        })
        .catch(next)
    }
  })

  router.use((req, res, next) => {
    next(new error.NotFoundError('경로를 찾을 수 없습니다.'))
  })
  router.use((err, req, res, next) => {
    if (
      err instanceof error.InsufficientDataError
      || err instanceof error.ValidationError
    ) {
      res.status(400).send({
        error: err.name,
        message: err.message
      })
    } else if (err instanceof error.NotFoundError) {
      res.status(404).send({
        error: err.name,
        message: err.message
      })
    } else {
      res.status(500).send({
        error: err.name,
        message: err.message
      })
    }
  })

  return router
}
