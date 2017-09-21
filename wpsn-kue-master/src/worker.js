require('dotenv').config()

const kue = require('kue')
const axios = require('axios')
const sharp = require('sharp')

const query = require('./query')
const image = require('./image')
const queue = kue.createQueue()

queue.process('thumbnail', (job, done) => {
  const {id} = job.data
  // 이미지 항목 정보를 데이터베이스에서 가져온 후
  // 원본 이미지 다운로드
  // 썸네일 생성
  // 썸네일 업로드
  // 이미지 항목의 썸네일 URL 수정
})
