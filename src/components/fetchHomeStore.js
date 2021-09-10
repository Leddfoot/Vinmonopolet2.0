const request = require('postman-request')
const config = require('./config')
const key = config.vinMonopoletAPIKeyPrimary


const fetchHomeStore = (searchTerm, callback) => {

  const options = {
    json: true,
    url: 'https://apis.vinmonopolet.no/stores/v0/details?storeId=', 
    headers: {
      'Cache-Control': 'no-cache',
      'Ocp-Apim-Subscription-Key': key    
    } 
  
  }
  options.url += searchTerm
  request(options, (error, { body }) => {
      if (error) {
          callback('Unable to connect to vinmonopolet service!', undefined)
      } else if (body.error) {
          console.log(body.error)
          callback('The vinmonopolet api didnt like that search', undefined)
      } else {
          callback(undefined, body)
      }
  })
} 

module.exports = fetchHomeStore
