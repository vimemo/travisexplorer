import Pg, {ensureDbExists} from '../lib/pg'

const DB_NAME = 'testdb'
const TABLE_NAME = 'testreplica'
const DB_URL = `${process.env.TEST_PG_URL}/${DB_NAME}`

let pgdb, pgtable

describe('pg', () => {

  test('invalid constructor', () => {
    expect(() => new Pg()).toThrowError(/Missing Parameter/)
  })

  describe('functional', () => {
    beforeEach(async () => {
      await ensureDbExists(DB_URL)
      pgdb = new Pg(DB_URL)
      await pgdb.dropTableIfExists(TABLE_NAME)
      pgtable = await pgdb.createTableIfNotExists(TABLE_NAME, table => {
        table.increments()
        table.string('name')
        table.string('description')
      })
    })

    afterEach(async () => { await pgdb.db.destroy() })

    test('insert, get', async () => {
      await pgtable.insert([
        {name: 'A', description: 'AAA'},
        {name: 'B', description: 'BBB'},
        {name: 'C', description: 'CCC'}
      ])
      const rows = await pgtable.rows()
      expect(rows.length).toBe(3)
      expect(rows).toMatchSnapshot()
    })

    test('create table if not exists', async () => {
      const sametable = await pgdb.createTableIfNotExists(TABLE_NAME)
      expect(sametable.name).toBe(TABLE_NAME)
    })
  })
})
