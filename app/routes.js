const express = require('express')
const router = express.Router()
const data = require('../data/open-establishments.json')

// Example wizard
require('./routes/example-wizard')(router)

// Add your routes here - above the module.exports line
router.get('/api/v1/schools/', (req, res) => {
  const query = req.query.search
  const results = data.filter(({ name }) => name.toLowerCase().indexOf(query.toLowerCase()) !== -1)
  res.end(JSON.stringify(results.slice(0, 100)))
})

module.exports = router
