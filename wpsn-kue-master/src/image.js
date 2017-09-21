require('dotenv').config()

const aws = require('aws-sdk')
const uuid = require('uuid')
const fileType = require('file-type')

const s3 = new aws.S3({
  apiVersion: '2006-03-01'
})

const supportedImageExt = ['png', 'jpg']

/**
 * S3에 이미지를 업로드합니다.
 * @param {Buffer} buffer
 * @returns {Promise}
 */
function uploadImageFile(buffer) {
  return new Promise((resolve, reject) => {
    // 파일 타입 체크해서 png, jpg가 아니면 에러 발생

    // s3에 업로드 후 Location 반환

  })
}

/**
 * 사용자로부터 받은 이미지 파일의 크기를 검사한 후 S3에 업로드합니다.
 * @param file - multer 파일 객체 https://www.npmjs.com/package/multer#file-information
 * @returns {Promise}
 */
function uploadOriginalFile(file) {
  return new Promise((resolve, reject) => {
    // 1MB 보다 크면 에러 발생

    // 이미지 업로드

  })
}

/**
 * 썸네일 생성 작업을 작업 큐에 추가합니다.
 * @param queue - kue queue 인스턴스
 * @param {string} location - S3에 업로드된 파일의 public url
 * @returns {Promise}
 */
function createThumbnailJob(queue, id) {
  return new Promise((resolve, reject) => {

  })
}

module.exports = {
  createThumbnailJob,
  uploadOriginalFile,
  uploadImageFile
}
