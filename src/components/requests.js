import { handleSingleQueryResults, setEntireListOfStores } from '../index'

const fetchStoreInfo = async (searchTerm, getAllStores)=> {
  // let url = 'http://localhost:3000/vinmonopolet?city=' + searchTerm //changing for heroku deployment
  let url = ('https://leddfoot-test.herokuapp.com/homestore?id=' + id)
  // let url = 'https://leddfoot-test.herokuapp.com/vinmonopolet?city=' + searchTerm
            //  https://leddfoot-test.herokuapp.com/vinmonopolet?city=oslo
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
  // const response = await fetch('http://localhost:3000/homestore?id=' + id) //changing for heroku deployment
  const response = await fetch('https://leddfoot-test.herokuapp.com/homestore?id=' + id)
  if (response.status === 200) {
    const data = response.json()
    return data
  } else {
    console.log('Problem with our server')
  }
}

const getStoresSingleQuery = async (searchTerm, searchTermIsMultiple, getAllStores)=>{
  const preliminaryResult = await fetchStoreInfo(searchTerm , getAllStores)
  const result = preliminaryResult.storeData
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
 const getHomeStoreQuery = async (searchTerm)=>{
  const preliminaryResult = await fetchHomeStore(searchTerm)
  const result = preliminaryResult.storeData
  return result  
 }

 export { fetchStoreInfo, getStoresSingleQuery, fetchHomeStore, getHomeStoreQuery }

