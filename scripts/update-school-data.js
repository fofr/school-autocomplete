const fs = require('fs')
const csv = require('csv-parser')
const allSchoolData = []

fs.createReadStream('data/edubasealldata.csv')
  .pipe(csv())
  .on('data', (data) => allSchoolData.push(data))
  .on('end', () => {
    generateSchoolJson(allSchoolData)
  })

const generateSchoolJson = (allSchoolData) => {
  const schools = allSchoolData.map(school => {
    return {
      urn: school.URN,
      ukprn: school.UKPRN,
      name: school.EstablishmentName,
      local_authority: school['LA (name)'],
      status: school['EstablishmentStatus (name)'],
      type: school['TypeOfEstablishment (name)'],
      phase: school['PhaseOfEducation (name)'],
      address: school.Street,
      locality: school.Locality,
      address3: school.Address3,
      town: school.Town,
      county: school['County (name)'],
      postcode: school.Postcode
    }
  })

  writeJsonFile(schools, 'data/all-establishments.json')
  writeJsonFile(schools.filter(school => (school.status === 'Open')), 'data/open-establishments.json')
}

const writeJsonFile = (data, file) => {
  fs.writeFile(file, JSON.stringify(data), 'utf8', (err) => {
    if (err) {
      console.log(`Error writing ${file}: ${err}`)
    } else {
      console.log(`${file} updated`)
    }
  })
}
