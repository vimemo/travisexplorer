const CurlRequest = require('curl-request');

const curl = new CurlRequest()
const wait = ms => new Promise((r, j)=>setTimeout(r, ms))
const URL = process.env.TEST_COUCH_URL
const WAIT_TIME = 5000

module.exports = async (maxRetries = 10) => {
  let retries = 0
  while(true) {
    if(retries ++ >= maxRetries) {
      console.log(`****** ERROR: Unable to connect to ${URL}!`)
      // process.exit(1)
      break;
    }
    try {
      const {statusCode} = await curl.get(URL)
      if(statusCode === 200) {
        console.log(`${URL} is now avaliable.`)
        break;
      }
    } catch(err) {}
    console.log(`====> Waiting on couch db(${URL}) to become available.`)
    await wait(WAIT_TIME)
  }
}
