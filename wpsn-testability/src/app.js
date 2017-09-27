const express = require('express')
const morgan = require('morgan')

const createApiRouter = require('./router/api')

module.exports = ({postMessage}) => {
  const app = express()

  app.set('trust proxy', true)
  app.use(morgan('tiny'))
  app.use('/api', createApiRouter({postMessage}))

  return app
}
