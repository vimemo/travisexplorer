import express from 'express'
import Pouch from './pouch'
const PORT = 3000

const app = express()
app.get('/', (req, res) => {
  res.send('hello')
})
app.get('/count', async (req, res) => {
  const pouch = new Pouch('http://admin:pass@localhost:5984/medic')
  res.send('count:'+await pouch.count())
})
app.listen(PORT)
console.log('Running on http://localhost:' + PORT)
