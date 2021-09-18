// It is easiest to test store will open, closing, has closed and holiday events
// when the homestore loads.This process is exactly the same as rendering a store
// You can just go into the stores.js file and tweak the opening/closed hours etc:
// Steps needed to hook this up are:

//in index.js you need to import getStoreById from requests.js
//in index.js handleHomeStore() you need to replace the two matching fetches below:


    // const fetchHomeStoreInfo = async ()=> {
    //     const homeStoreInfo = await getStoreById(homeStoreId)
    //     console.log('homeStoreInfo: ', homeStoreInfo);
    //     return homeStoreInfo
    //   }
  
      
    //   fetchHomeStoreInfo().then((result) => {
    //     renderStoreAddress(result)
    //   })

//then PASTE FOLLOWING CODE INTO REQUESTS.JS
// NOTE:  you have to have the stores.js file

    //  import { stores } from './stores' //for testing (countdown, change closing times)
    //  export async function getStoreById(Id) {
    //   console.log('making small fake fetch')
    //   const littleStoreList = fakeSmallAPIcallId(stores, Id)
    //   return littleStoreList
    // }

    // const fakeSmallAPIcallId = (stores, Id) => {
    //   return stores.filter(function (store) {    
    //     const isStoreNameMatch = store.storeId.includes(Id)    
    //     return isStoreNameMatch 
    //   })  
    // }
