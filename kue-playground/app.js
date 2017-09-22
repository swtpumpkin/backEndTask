const express = require('express')

const app = express()

const router = express.Router()

router.get('/', (req, res) => {
  res.send('hello router')
})

const router2 = express.Router()

router2.get('/', (req, res) => {
  res.send('hello router2')
})

router2.use((req, res, next) => {
  res.status(404)
  res.send('Not Found')
})

app.use(router)
app.use('/router2', router2)

app.listen(3000, () => {
  console.log('lintening...')
})