const fileType = require('file-type')
const fs = require('fs')

const buffer = fs.readFileSync('node.png')
console.log(fileType(buffer))