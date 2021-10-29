const fs = require('fs')
const { DateTime } = require('luxon')
const download = require('download')
const file = `http://ea-edubase-api-prod.azurewebsites.net/edubase/edubasealldata${DateTime.now().toFormat('yyyyMMdd')}.csv`;

(async () => {
  fs.writeFileSync('data/edubasealldata.csv', await download(file))
})()
