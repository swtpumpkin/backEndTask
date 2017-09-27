const WebClient = require('@slack/client').WebClient

const web = new WebClient(process.env.SLACK_API_TOKEN)

function postMessage(message, options) {
  return new Promise((resolve, reject) => {
    web.chat.postMessage(
      process.env.SLACK_CHANNEL_ID,
      message,
      options,
      (err, res) => {
        if (err) {
          reject(err)
        } else {
          resolve(res)
        }
      }
    )
  })
}

module.exports = {
  postMessage
}
