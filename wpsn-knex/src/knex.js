require('dotenv').config()

module.exports = require('knex')({
  client: 'mysql',
  connection: {
    host: process.env.DATABASE_HOST,
    // 실제 서비스에서는 root 계정을 사용하지 않는 것이 좋습니다.
    user:  process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME
  },
  debug: true
})
