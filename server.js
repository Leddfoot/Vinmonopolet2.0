const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const path = require('path')

const fetchVinmonopoletfilePath = path.join(__dirname, '/src/components/fetchVinmonopolet.js')
const fetchVinmonopolet = require(fetchVinmonopoletfilePath)

const fetchHomeStorePath = path.join(__dirname, '/src/components/fetchHomeStore.js')
const fetchHomeStore = require(fetchHomeStorePath)

const app = express()
const config = require('./webpack.config.js')
const compiler = webpack(config)

app.get('/homestore', (req, res) => {
  if (!req.query.id) {
      return res.send({
          error: 'You must provide an id in the query! IE: localhost:3000/vinmonopolet?id=blabla. (in the future Marty)'
      })
  }
  const searchTerm = req.query.id

  fetchHomeStore(searchTerm, (error, storeData) => {
    if (error) {
        return res.send({ error })
    }

      res.send({
          storeData: storeData,          
          storeID: req.query.id,//note this is the query field in the browser, whatever is typed after ?id=blabla inthe browser
          
      })
  })

})
app.get('/vinmonopolet', (req, res) => {
  if (!req.query.city) {
      return res.send({
          error: 'You must provide a city in the query! IE: localhost:3000/vinmonopolet?city=blabla. (in the future Marty)'
      })
  }

  const searchTerm = req.query.city

  fetchVinmonopolet(searchTerm, req.query.getallstores, (error, storeData) => {
    if (error) {
        return res.send({ error })
    }

      res.send({
          storeData: storeData,          
          cityFromBrowserQuery: req.query.city//note this is the query field in the browser, whatever is typed after ?address=blabla inthe browser
      })
  })

})

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(
  webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
  })
);

// Serve the files on port 3000.
app.listen(3000, function () {
  console.log('Server is up on port 3000.\n');
})