const request = require('postman-request')

const key = process.env.apiKey

const fetchHomeStore = (searchTerm, callback) => {
  console.log('callback: ', callback);
  console.log('searchTerm: ', searchTerm);

  const options = {
    
    json: true,
    url: 'https://apis.vinmonopolet.no/stores/v0/details?storeId=', 
    headers: {
      'Cache-Control': 'no-cache',
      'Ocp-Apim-Subscription-Key': key    
    } 
  
  }
  options.url += searchTerm
  console.log('options.url: ', options);

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

module.exports = fetchHomeStore
