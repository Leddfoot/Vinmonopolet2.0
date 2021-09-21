const request = require('postman-request')
// const config = require('./config')
// const key = config.vinMonopoletAPIKeyPrimary

const key = process.env.vinMonopoletAPIKeyPrimary


const fetchVinmonopolet = (searchTerm, getAllStores, callback) => {
  let url = 'https://apis.vinmonopolet.no/stores/v0/details?storeNameContains='
  const options = {
    json: true,
    url: url, 
    headers: {
      'Cache-Control': 'no-cache',
      'Ocp-Apim-Subscription-Key': key    
    } 
  
  }
  options.url += searchTerm
  if (getAllStores) {
    options.url = 'https://apis.vinmonopolet.no/stores/v0/details'
  }
  request(options, (error, { body }) => {
      if (error) {
          callback('Unable to connect to vinmonopolet service!', undefined)
      } else if (body.error) {
          callback('The vinmonopolet api didnt like that search', undefined)
      } else {
          callback(undefined, body)
      }
  })
} 

module.exports = fetchVinmonopolet

