const express = require('express')
const cookieSession = require('cookie-session')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
const flash = require('connect-flash');
const csurf = require('csurf')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const query = require('./query')

const app = express()
const urlencodedMiddleware = bodyParser.urlencoded({ extended: false })
const csrfMiddleware = csurf()

app.use(cookieSession({
  name: 'session',
  keys: ['mysecret']
}))
app.use(urlencodedMiddleware)
app.use(csrfMiddleware)
app.use(flash())
app.set('view engine', 'ejs')

app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser((user, done) => {
  // user 객체로부터 세션에 저장할 수 있는 문자열을 만들어서 반환
  done(null, user.id)
})
// 로그인 되어있는 상태에서 로그인 정보를 얻길 원할 때 사용
passport.deserializeUser((id, done) => {
  // 세션에 저장되어 있는 id를 통해 user 객체를 얻어온 후 반환
  query.getUserById(id)
    .then(user => {
      if(user){
        done(null, user)
      } else {
        done(new Error('아이디가 일치하는 사용자가 없습니다.'))
      }
    })
})
// 최초 로그인을 시킬 때 사용
passport.use(new LocalStrategy((username, password, done) => {
  query.getUserById(username)
    .then(matched => {
      if(matched && bcrypt.compareSync(password, matched.password)){
        done(null, matched)
      } else {
        // 아이디 혹은 비밀번호를 구분해서 일치하지 않는다고 알려주는 것보다 구분하지 않고 알려주는 것이 보안에 좋다.
        done(new Error('사용자 이름 혹은 비밀번호가 일치하지 않습니다.'))
      }
  })
}))

function authMiddleware(req, res, next) {
  if (req.user) {
    // 로그인이 된 상태이므로 그냥 통과시킨다.
    next()
  } else {
    res.redirect('/login')
  }
}

app.get('/', authMiddleware, (req, res) => {
  query.getUrlEntriesByUserId(req.user.id)
    .then(rows => {
      res.render('index.ejs',{rows , csrfToken: req.csrfToken() })
    })
})

app.get('/login', (req,res)=>{
  res.render('login.ejs', {errors: req.flash('error'), csrfToken: req.csrfToken() })
})

app.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  // 위에서 발생시켰던 에러메세지를 불러온다. `new Error('사용자 이름 혹은 비밀번호가 일치하지 않습니다.')
  failureFlash: true
}))

app.post('/logout',(req, res)=>{
  // req.session = null
  req.logout()
  res.redirect('/login')
})

app.post('/url_entry', authMiddleware, (req, res) => {
  const long_url = req.body.long_url
  query.createUrlEntry(long_url, req.user.id)
    .then(() => {
      res.redirect('/')
    })
    .catch(err => {
      res.status(400)
      res.send(err.message)
    })
})

app.get('/:id', (req, res, next)=> {
  query.getUrlById(req.params.id)
    .then(entry => {
      if(entry){
        query.incrementClickCountById(entry.id)
          .then(()=>{
            res.redirect(entry.long_url)
          })
      }else {
        next()
      }
    })
})

app.get('/register', (req, res)=> {
  res.render('register.ejs', { csrfToken: req.csrfToken() })
})

app.post('/register', (req, res)=>{
  query.createUser(req.body.id, req.body.password)
  .then(()=>{
    req.session.id = req.body.id
    res.redirect('/')
  })
})

app.listen(3000, () => {
  console.log('listening...')
})
