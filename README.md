# Vinmonopolet2.0

This is a project I used to assess my vanilla javascript, html, and css skills. While working on the Deichman website and a site I was building myself, I used React. On some occasions I felt like I needed to have stronger js skills, particularly asynchronous, fetch, callbacks and other things.

It is deployed live on Heroku at https://leddfoot-test.herokuapp.com/ .

I designed this site as to test my skills, and to force myself to meet a set of requirements. These requirements were not altogether crazy, but they were enough to test myself. I wanted first and foremost, vanilla javascript. This I accomplished with the exception that I did break down and use postman-request. I also wanted data from an external API. I learned way too much about CORS and gained some more experience with fetching/async.

Other than that I needed to have it functional and deployed on Heroku. There was a lot of lessons learned regarding deploying with webpack and Heroku deployment.

I knew that the app did not offer anything new that you can't get on Vinmonopolet.no. In fact they have a better search function where stores are listed by distance from your location, or by the store name. I did add searching by zip and city. 

I was also very aware that this code would be much shorter and simpler, by using a framework like react, but this was outside of the vanilla clause. 

TO RUN THIS DEPLOYMENT YOURSELF -- you need an API key.

--git clone Leddfoot/Vinmonopolet2.0

--cd to directory

--npm install

--some adjustments are needed in the code to revert to webpack

--- the output path in webpack config has to be changed to http://localhost:3000/

---create a config file (config.js), in src/components,  which is just an exported object: 
const config = {
    vinMonopoletAPIKeyPrimary: 'YOUR-API-KEY-HERE'
}

module.exports = config

---in requests.js, comment out the heroku URL's, and use the local host URL's instead. (in functions fetchStoreInfo() and fetchHomeStore())

---In both the fetchHomeStore.js and the fetchVinmonpolet.js files.
 --uncomment the import for config.js
 --comment out the const declaration const key = process.env.vinMonopoletAPIKeyPrimary and use the const key = config.vinMonopoletAPIKeyPrimary instead


