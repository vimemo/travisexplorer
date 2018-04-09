import CurlRequest from 'curl-request'

const curl = new CurlRequest()
const URL = 'http://admin:pass@localhost:5984'
const medic = `${URL}/medic-test`
const sentinel = `${URL}/medic-test-sentinel`

describe('curl', () => {
  test('medic-test exists', async () => {
    const {statusCode} = await curl.get(medic)
    expect(statusCode).toBe(200)
  })

  test('medic-test exists', async () => {
    const {statusCode} = await curl.get(sentinel)
    expect(statusCode).toBe(200)
  })
})
