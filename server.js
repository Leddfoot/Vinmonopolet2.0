const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const path = require('path')


const temporaryVinmonopoletfilePath = path.join(__dirname, '/src/components/vinmonopolet.js')
const vinmonopolet = require(temporaryVinmonopoletfilePath)

const fetchVinmonopoletfilePath = path.join(__dirname, '/src/components/fetchVinmonopolet.js')
const fetchVinmonopolet = require(fetchVinmonopoletfilePath)

const app = express();
const config = require('./webpack.config.js');
const compiler = webpack(config);

app.get('/vinmonopolet', (req, res) => {
  if (!req.query.city) {
      return res.send({
          error: 'You must provide a city in the query! IE: localhost:3000/vinmonopolet?city=blabla. (in the future Marty)'
      })
  }

  const searchTerm = req.query.city

  vinmonopolet(searchTerm, (error, storeData) => {
      if (error) {
          return res.send({ error })
      }

      res.send({
          storeData: storeData,          
          cityFromBrowserQuery: req.query.city//note this is the query field in the browser, whatever is typed after ?address=blabla inthe browser
      })
  })

})

////////////////////////////////////////////////////////////////////////
app.get('/fetchvinmonopolet', (req, res) => {
  if (!req.query.city) {
      return res.send({
          error: 'You must provide a city in the query! IE: localhost:3000/fetchVinmonopolet?city=blabla. (in the future Marty)'
      })
  }

  const searchTerm = req.query.city

  fetchVinmonopolet(searchTerm, (error, storeData) => {
      if (error) {
          return res.send({ error })
      }

      res.send({
          storeData: storeData,          
          cityFromBrowserQuery: req.query.city//note this is the query field in the browser, whatever is typed after ?address=blabla inthe browser
      })
  })

})
////////////////////////////////////////////////////////////////////////

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