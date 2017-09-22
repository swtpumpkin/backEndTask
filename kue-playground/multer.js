const express = require('express')
const multer = require('multer')
const sharp = require('sharp')

const app = express()
const upload = multer()

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  res.render('index.ejs')
})

app.post('/', upload.single('photo'), (req, res) => {
  // multer가 자동으로 파일 객체안에 버퍼객체를 만들어 넣어준다.  
  sharp(req.file.buffer)
    .resize(200, 200)
    .crop(sharp.gravity.center)
    // 하드에 저장
    .toFile('output2.png', (err, info) => {
      console.log(info)
      res.redirect('/')
    })
})

app.listen(3000, () => {
  console.log('listening...')
})