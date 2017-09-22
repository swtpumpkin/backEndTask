const fs = require('fs')
const aws = require('aws-sdk')
const s3 = new aws.S3({
  apiVersion: '2006-03-01'
})

const buffer = fs.readFileSync('producer.js')

s3.upload({
  ACL: 'public-read',
  Body: buffer,
  Bucket: 'wpsn-s3-practice-jw',
  Key: 'producer.js',
  ContentDisposition: 'inline',
  ContentType: 'text/jacascript'
}, (err, data) => {
  console.log(data.Location)
})