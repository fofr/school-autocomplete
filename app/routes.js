const express = require('express')
const router = express.Router()
const data = require('../data/open-establishments.json')

// Example wizard
require('./routes/example-wizard')(router)

// Add your routes here - above the module.exports line
router.get('/api/v1/schools/', (req, res) => {
  const query = req.query.search
  const results = data.filter(({ name }) => normaliseName(name).indexOf(normaliseName(query).toLowerCase()) !== -1)
  res.end(JSON.stringify(results.slice(0, 100)))
})

const normaliseName = (name) => {
  let normalisedName = name.toLowerCase()

  // remove punctuation
  normalisedName = normalisedName.replace(/['.,/#!$%^&*;:{}=\-_`~()]/g, '')

  // standardise church of england
  // normalisedName = normalisedName.replace(/church of england/g, 'cofe')

  return normalisedName
}

module.exports = router
