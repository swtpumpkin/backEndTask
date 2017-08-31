const express = require('express') // 익스프레스
const basicAuth = require('express-basic-auth') // 익스프레스 베이직 어스
const morgan = require('morgan') // 모르간

const app = express() //express로 작동하게 함


// 익스프레스베이직어스는 글 삭제 게시판에는 아무나 접근 못 하도록 관리가 계정을 두도록 하기 위해 설치하였다.
const authMiddleware = basicAuth({
  users: { 'admin': 'admin' },
  challenge: true,
  realm: 'Imb4T3st4pp'
})
const data = []

//express가 ejs를 템플릿 엔진으로 사용 가능하게 셋팅
app.set('view engine', 'ejs')

//http loger 로그기록남김
app.use(morgan('tiny')) 

//index.ejs file을 localhost에 랜더링 함.
app.get('/', (req, res)=>{
  res.render('index.ejs', {data})
})

//터미널에서 서버를 작동 시 listening...이라는 메세지가 표출되도록 하는 console
app.listen(3000, () =>{
  console.log('listening...')
})