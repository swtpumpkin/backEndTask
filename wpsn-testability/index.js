require('./env')

const createApp = require('./src/app')
const slack = require('./src/slack')

const app = createApp({postMessage: slack.postMessage})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`listening ${PORT}...`)
})
