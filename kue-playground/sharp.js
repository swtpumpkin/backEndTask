const fs = require('fs')
const sharp = require('sharp')

const buffer = fs.readFileSync('node.png')

sharp(buffer)
.resize(200, 200)
.crop(sharp.gravity.center)
.toFile('output.png', (err, info) => {
  console.log(info)
})