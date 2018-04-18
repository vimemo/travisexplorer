import format from 'pg-format'
import parser from 'url'
import knex from 'knex'

export const ensureDbExists = async (url) => {
  const opts = parser.parse(url)
  const dbname = opts.path.slice(1)
  const conn = knex({client: 'pg', connection: url.replace(opts.path, '')})
  try {
    await conn.raw(`CREATE DATABASE \"${dbname}\"`)
  } catch(err) {
    //db already exists - ignore
    // if(err.message.indexOf('already exists') < 0){
    //   throw err
    // }
  }
  conn.destroy()
}

const connection = url => {
  ensureDbExists(url)
  return knex({client: 'pg', connection: url})
}

const throwIfMissing = () => { throw new Error('Missing Parameter') }

class PgTable {
  constructor(db, name) {
    this.db = db
    this.name = name
  }

  async rows() {
    return (await this.db.raw(`select * from ${this.name}`)).rows
  }

  async insert(rows) {
    return this.db(this.name).insert(rows)
  }
}

export default class Pg {
  constructor(url=throwIfMissing()) {
    this.url = url
    this.db = connection(this.url)
  }

  async createTableIfNotExists(name, callback) {
    if(!await this.db.schema.hasTable(name)) {
      await this.db.schema.createTable(name, callback)
    }
    return new PgTable(this.db, name)
  }

  async dropTableIfExists(name) {
    await this.db.schema.dropTableIfExists(name)
  }
}
