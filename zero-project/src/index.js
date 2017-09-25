const express = require('express')
const bodyParser = require('body-parser')
const query = require('./query')
const jwt = require('jsonwebtoken')
const expressjwt = require('express-jwt')
const cors = require('cors')
const app = express()

app.use(bodyParser.json())
app.use(cors())

app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send({
      error: err.name,
      message: err.message
    })
  } else if (err instanceof NotFoundError){
    res.status(404).send({
      message: err.message
    })
  } else if (err instanceof ForbiddenError){
    res.status(403).send({
      message: err.message
    })
  }
})

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
  console.log(req.body)
  query.createTodo(user_id, title)
    .then(([id]) => {
      return query.getTodoById(id)
    })
    .then(todo => {
      res.status(201)
      res.send(todo)
    })
})
class NotFoundError extends Error {
  constructor(message) {
    super(message)
    this.name = 'NotFoundError'
  }
}
class ForbiddenError extends Error {
  constructor(message) {
    super(message)
    this.name = 'ForbiddenError'
  }
}

const authorizeTodo = user_id => todo => {
  if(!todo) {
    // 404 error
    throw new NotFoundError('경로를 찾을 수 없습니다.')
  }else if(todo.user_id !== user_id) {
    // 403 error
    throw new ForbiddenError('허가되지 않은 접근입니다.')
  }else {
    return
  }
}

app.patch('/todos/:id', jwtMiddleware, (req,res, next) => {
  const id = req.params.id
  const title = req.body.title
  const complete = req.body.complete
  const user_id = req.user.id
  query.getTodoById(id)
    .then(authorizeTodo(user_id))
    .then(() => {
      query.updateTodoById(id, {title, complete})
        .then(id => query.getTodoById(id))
        .then(todo => {
          res.send(todo)
        })
    })
    .catch(next)
})

app.delete('/todos/:id', jwtMiddleware, (req, res) => {
  const id = req.params.id
  const user_id = req.user.id
  query.getTodoById(id)
    .then(authorizeTodo(user_id))
    .then(() => query.deleteTodoById(id))
    .then(id => {
      res.end()
    })
    .catch(next)
})

app.listen(3000, () => {
  console.log('listening...')
})
