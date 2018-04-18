import Pouch from '../lib/pouch'
import docs from './docs.json'

describe('couch', () => {
  const DB_NAME = 'couch-testing'
  const COUCH_DB_URL = `${process.env.TEST_COUCH_URL}/${DB_NAME}`
  const couch = new Pouch(COUCH_DB_URL)

  const cleanUp = async () => await new Pouch(COUCH_DB_URL).db.destroy()

  beforeAll(() => cleanUp())
  afterAll(() => cleanUp())

  test('empty constructor', () => {
    expect(() => new Pouch()).toThrowError(/Missing Parameter/)
    expect.assertions(1)
  })

  describe('integration', () => {
    beforeEach(async () => await new Pouch(COUCH_DB_URL).db.bulkDocs(docs))
    test('docs, count', async () => {
      expect((await couch.docs())[0].doc.rev).toBe(docs[0].doc.rev)
      expect((await couch.count()) === 2).toBe(true)
    })

    test('docs by keys', async () => {
      const saved = (await couch.docs())[0]
      const doc = (await couch.docs([saved._id]))[0]
      expect(doc.id).toEqual(saved.id)
    })
  })
})
