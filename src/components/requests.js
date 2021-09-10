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
  return stores.filter(function (store) {    
    const isStoreNameMatch = store.storeName.toLowerCase().includes(searchTerm.toString().toLowerCase())
    return isStoreNameMatch 
  })  
}

export async function getallStores() {
  const storeList = stores
  console.log('fake fetching everything')
   return storeList
 }

 ///////////////
/////////////
export async function getStoreById(Id) {
  console.log('making small fake fetch')
  const littleStoreList = fakeSmallAPIcallId(stores, Id)
  return littleStoreList
}

const fakeSmallAPIcallId = (stores, Id) => {
  return stores.filter(function (store) {    
    const isStoreNameMatch = store.storeId.includes(Id)    
    return isStoreNameMatch 
  })  
}
//////////////////////
/////////////

 ////

//////////////END USE ONLY FOR TESTING/////////////////////////////
//////////////END USE ONLY FOR TESTING/////////////////////////////
//////////////END USE ONLY FOR TESTING/////////////////////////////
//////////////END USE ONLY FOR TESTING/////////////////////////////
import { handleSingleQueryResults, setEntireListOfStores } from '../index'

const fetchStoreInfo = async (searchTerm, getAllStores)=> {
  let url = 'http://localhost:3000/vinmonopolet?city=' + searchTerm
  if (getAllStores) {
    url += '&getallstores=true'
  }

  const response = await fetch(url)
  if (response.status === 200) {
    const data = response.json()
    return data
  } else {
    console.log('Problem with our server')
  }
}

const fetchHomeStore = async (id)=> {
  const response = await fetch('http://localhost:3000/homestore?id=' + id)
  if (response.status === 200) {
    const data = response.json()
    return data
  } else {
    console.log('Problem with our server')
  }
}
////////////////////////////temp////////////////////////////
////////////////////////////temp////////////////////////////
////////////////////////////temp////////////////////////////
////////////////////////////temp////////////////////////////

// if (!getallStores) {
//   const bullshit = fakeSmallAPIcall(stores, searchTerm)
//   console.log('bullshit: ', bullshit);
//   return bullshit
// } else {
//  // return getallStores()
// }

const getStoresSingleQuery = async (searchTerm, searchTermIsMultiple, getAllStores)=>{
  const preliminaryResult = await getStoreByName(searchTerm , getAllStores)
  console.log('preliminaryResult: ', preliminaryResult);
  const result = preliminaryResult
  if (getAllStores) {
    setEntireListOfStores(result)
    return
  }

  if (!searchTermIsMultiple) {
    handleSingleQueryResults(result, searchTerm)
    
    
  } else {
    return result
  } 
 }


// const getStoresSingleQuery = async (searchTerm, searchTermIsMultiple, getAllStores)=>{
//   const preliminaryResult = await fetchStoreInfo(searchTerm , getAllStores)
//   const result = preliminaryResult.storeData
//   if (getAllStores) {
//     setEntireListOfStores(result)
//     return
//   }

//   if (!searchTermIsMultiple) {
//     handleSingleQueryResults(result, searchTerm)
//   } else {
//     return result
//   } 
//  }
/////////////////////temp/////////////////////////////////////////
/////////////////////temp/////////////////////////////////////////
/////////////////////temp/////////////////////////////////////////
/////////////////////temp/////////////////////////////////////////
 const getHomeStoreQuery = async (searchTerm)=>{
  const preliminaryResult = await fetchHomeStore(searchTerm)
  const result = preliminaryResult.storeData
  return result  
 }



  export { fetchStoreInfo, getStoresSingleQuery, fetchHomeStore, getHomeStoreQuery }
