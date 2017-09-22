const kue = require('kue')
const queue = kue.createQueue()

queue.process('my-job', 4, (job, done) => {
  console.log(job.data.message)
  done()
})