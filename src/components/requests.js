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

//////////////END USE ONLY FOR TESTING/////////////////////////////
//////////////END USE ONLY FOR TESTING/////////////////////////////
//////////////END USE ONLY FOR TESTING/////////////////////////////
//////////////END USE ONLY FOR TESTING/////////////////////////////
import { handleSingleQueryResults } from '../index'

const fetchStoreInfo = async (searchTerm)=> {
  const response = await fetch('http://localhost:3000/vinmonopolet?city=' + searchTerm)
  if (response.status === 200) {
    const data = response.json()
    return data
  } else {
    console.log('ahhh shit')
  }
}
const fetchHomeStore = async (id)=> {
  const response = await fetch('http://localhost:3000/homestore?id=' + id)
  if (response.status === 200) {
    const data = response.json()
    return data
  } else {
    console.log('ahhh shit')
  }
}

const getStoresSingleQuery = async (searchTerm, searchTermIsMultiple)=>{
  const preliminaryResult = await fetchStoreInfo(searchTerm)
  console.log(fetchStoreInfo(searchTerm));
  console.log('preliminaryResult: ', preliminaryResult);
  const result = preliminaryResult.storeData
  console.log('result: ', result);
  if (!searchTermIsMultiple) {
    handleSingleQueryResults(result, searchTerm)
  } else {
    return result
  } 
 }

 const getHomeStoreQuery = async (searchTerm)=>{
  const preliminaryResult = await fetchHomeStore(searchTerm)
  // console.log(fetchStoreInfo(searchTerm));
  console.log('preliminaryResult: ', preliminaryResult);
  const result = preliminaryResult.storeData
  console.log('result: ', result);

    return result
  
 }



  export { fetchStoreInfo, getStoresSingleQuery, fetchHomeStore, getHomeStoreQuery }
