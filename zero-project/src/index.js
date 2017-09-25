const express = require('express')
const bodyParser = require('body-parser')
const query = require('./query')
const jwt = require('jsonwebtoken')
const expressjwt = require('express-jwt')

const app = express()

app.use(bodyParser.json())
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send({
      error: err.name,
      message: err.message
    });
  }
});

const jwtMiddleware = expressjwt({secret: 'mysecret'})

app.get('/user', jwtMiddleware, (req, res) => {
  query.getUserById(req.user.id)
    .then(user => {
      res.send({
        username: user.username
      })
    })

})

app.post('/user', (req, res) => {
  // 사용자 생성
  const {username, password} = req.body
  query.createUser(username, password)
    .then(([id]) => {
      // JWT 발행
      const token = jwt.sign({id}, 'mysecret')
      // 반환
      res.send({
        token
      })
    })
})

app.post('/login', (req, res) => {
  const {username, password} = req.body
  query.compareUser(username, password)
    .then((user) => {
      const token = jwt.sign({id: user.id}, 'mysecret')
      res.send({
        token
      })
    })
})

app.get('/todos', jwtMiddleware, (req, res) => {
  const user_id = req.user.id
  // userId가 쇼유하고 있는 할 일 목록을 불어와서환반환
  query.getTodosByUserId(user_id)
    .then((todos) => {
      res.send(todos)
    })
})

app.post('/todos', jwtMiddleware, (req, res) => {
  const user_id = req.user.id
  const title = req.body.title
  query.createTodo(user_id, title)
    .then(() => {
      res.status(201)
      res.end()
    })
})

app.listen(3000, () => {
  console.log('listening...')
})
