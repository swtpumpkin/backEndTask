const express = require('express') // 익스프레스
const basicAuth = require('express-basic-auth') // 익스프레스 베이직 어스
const morgan = require('morgan') // 모르간
const bodyParser = require('body-parser')  // 바디파서

const app = express() //express로 작동하게 함


// 익스프레스베이직어스는 글 삭제 게시판에는 아무나 접근 못 하도록 관리가 계정을 두도록 하기 위해 설치하였다.
const authMiddleware = basicAuth({
  users: { 'admin': 'admin' },
  challenge: true,
  realm: 'Imb4T3st4pp'
})
//
const bodyParserMiddleware = bodyParser.urlencoded({ extended: false })
// 데이터를 담을 변수
const data = [{}]
const comment = [{}]

//express가 ejs를 템플릿 엔진으로 사용 가능하게 셋팅
app.set('view engine', 'ejs')

//http loger 로그기록남김
app.use(morgan('tiny'))
//public파일을 static에 저장
app.use('/static', express.static('public')) 

//index.ejs file을 localhost에 랜더링 함.
app.get('/', (req, res)=>{
  res.render('index.ejs', {data})
})
//border.ejs file을 localhost에 랜더링 함.
app.get('/board', (req, res)=>{
  res.render('board.ejs')
})
//read.ejs file을 localhost에 랜더링 함.
app.get('/read', (req, res)=>{
  res.render('read.ejs')
})
// 관리자 모드 페이지(삭제 구현)
app.get('/manage', authMiddleware,(req, res)=>{
  res.render('manage.ejs')
})
//
app.get('/read/:num', (req, res)=> {
  const num = req.params.num*1
  const matched = [...data].find(item => item.num === num)
  console.log(matched)
  if(!matched) {
    res.status(404)
    res.send('404 Not Found')
  }else {
    res.render('read.ejs', {matched})
  }
})

//게시판에 글 올릴 수 있도록 한다.
app.post('/', bodyParserMiddleware, (req,res) => {
  const title = req.body.title
  const board = req.body.board
  let num // 오름차순을 위한 변수
  let numIncrease = 1;
  while(true) {
    const matched = data.find(item => item.num === numIncrease)
    if(!matched){
      num = numIncrease
      break
    }
    numIncrease++
  }
  data.push({num, title, board}) // 객체는 순서가 보장되지 않기때문에 프로퍼티명의 순서를 지킬 필요는 없다.
  res.redirect('/') // 302 응답코드
})
// 코멘트
app.post('/', bodyParserMiddleware, (req,res) => {
  const oidx = req.body.oidx
  const comment = req.body.comment
  data.matched.push(rep.comment) // 객체는 순서가 보장되지 않기때문에 프로퍼티명의 순서를 지킬 필요는 없다.
  res.redirect('/') // 302 응답코드
})

//터미널에서 서버를 작동 시 listening...이라는 메세지가 표출되도록 하는 console
app.listen(3000, () =>{
  console.log('listening...')
})