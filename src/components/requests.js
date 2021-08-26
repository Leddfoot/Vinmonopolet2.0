//////////////BEGIN USE ONLY FOR TESTING/////////////////////////////
//////////////BEGIN USE ONLY FOR TESTING/////////////////////////////
//////////////BEGIN USE ONLY FOR TESTING/////////////////////////////

import { stores } from './stores' //for testing (countdown, change closing times)
export async function getStoreByName(searchTerm) {
  console.log('making small fake fetch')
  const littleStoreList = fakeSmallAPIcall(stores, searchTerm)
  return littleStoreList
}

const fakeSmallAPIcall = (stores, searchTerm) => {
  console.log('searchTerm at fake: ', searchTerm);
  return stores.filter(function (store) {    
    const isStoreNameMatch = store.storeName.toLowerCase().includes(searchTerm.toString().toLowerCase())
    return isStoreNameMatch 
  })  
}

export async function getallStores(searchTerm) {
  const storeList = stores
  console.log('fake fetching everything')
   return storeList
 }

//////////////END USE ONLY FOR TESTING/////////////////////////////
//////////////END USE ONLY FOR TESTING/////////////////////////////
//////////////END USE ONLY FOR TESTING/////////////////////////////
//////////////END USE ONLY FOR TESTING/////////////////////////////

