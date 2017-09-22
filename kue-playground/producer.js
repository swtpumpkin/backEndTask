const kue = require('kue')
const queue = kue.createQueue()

queue.create('my-job', {message: 'hello kue!'})
  .removeOnComplete(true)
  .save()