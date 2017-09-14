const express = require('express')
const cookieSession = require('cookie-session')
const bodyParser = require('body-parser')

const query = require('./query')

const app = express()
const urlencodedMiddleware = bodyParser.urlencoded({ extended: false })

app.use(cookieSession({
  name: 'session',
  keys: ['mysecret']
}))
app.set('view engine', 'ejs')

function authMiddleware(req, res, next) {
  if(req.session.id){
    query.getUserById(req.session.id)
      .then(matched => {
        req.user = matched
        res.locals.user = matched
        next()
      })
  } else {
    res.redirect('/login')
  }
}

app.get('/', authMiddleware, (req, res) => {
  query.getUrlEntriesByUserId(req.user.id)
    .then(rows => {
      res.render('index.ejs',{rows})
    })
})

app.get('/login', (req,res)=>{
  res.render('login.ejs')
})

app.post('/login', urlencodedMiddleware, (req,res)=>{
  query.getUser(req.body.username, req.body.password)
    .then(matched => {
      if(matched){
        req.session.id = matched.id
        res.redirect('/')
      } else {
        res.status(400)
        res.send('400 Bad Request')
      }
    })
})

app.post('/logout',(req, res)=>{
  req.session = null
  res.redirect('/login')
})

app.listen(3000, () => {
  console.log('listening...')
})
