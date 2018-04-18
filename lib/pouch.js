import {pluck, sortBy, prop as prop} from 'ramda'
import PouchDB from 'pouchdb'

const throwIfMissing = () => { throw new Error('Missing Parameter') }

export default class Pouch {

  constructor(url=throwIfMissing()) {
    this.url = url
    this.db = new PouchDB(url)
  }

  async docs(keys=null) {
    const q = !keys ? {include_docs: true} : {include_docs: true, keys: keys}
    return pluck('doc', (await this.db.allDocs(q)).rows)
  }

  async count() {
    return (await this.docs()).length
  }
}
