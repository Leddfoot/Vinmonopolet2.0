///////BEGIN just an example webpack friendly image import
///////BEGIN just an example webpack friendly image import
///////BEGIN just an example webpack friendly image import
// import Icon from './tree.jpg'
//      const myIcon = new Image();
//     myIcon.src = Icon;
//     element.appendChild(myIcon);
///////EnD just an example webpack friendly image import
///////EnD just an example webpack friendly image import
///////EnD just an example webpack friendly image import

'use strict'
import './style.css'
import { getStoreByName, getallStores, getStoresSingleQuery, fetchHomeStore, getHomeStoreQuery } from './components/requests'
import { renderPageMainElement, renderTestSearch, renderStores, renderStoreAddress, renderNoStoresFound, renderHeader, renderClockDom, renderSearchElement, renderHomeStoreBar, renderTimeAndDate, removeDomElements } from './views/createPage'
import { preferredStore } from './components/preferenceStorage'

let searchTerm
let haveDownloadedEntireList = false
let searchTermIsMultiple = false
let moreResultsToDisplay = false
let listToPaginate = []
let entireListOfStores = {}
let displayingHomeStore = false
let selectedStoreIsOpen = false
let currentListOfStores = {}

const getDisplayingHomestore =()=>{ //used for deciding whether or not to render the 'make this my home store button'
  return displayingHomeStore
}

const setDisplayingHomeStore = (status)=> {
  displayingHomeStore = status
}
const getStoreOpenStatus =()=>{ //used for deciding if the countdown timer needs to be displayed
  return selectedStoreIsOpen
}

const setStoreOpenStatus = (status)=> {
  selectedStoreIsOpen = status
}

renderPageMainElement()
//////////temporary////////////////////
renderTestSearch()
//////////temporary////////////////////
renderHeader()
renderClockDom()
renderHomeStoreBar()
renderTimeAndDate()

///////////new stuff the way it should be///////////////start
///////////new stuff the way it should be///////////////
const handleSearchResults = ()=> {
  //this will get the final list of data, whether it is multi fetches or just one
  removeDomElements()
  displayingHomeStore = false 
  searchTermIsMultiple = false
  listToPaginate = {}
}


//////////////////you are here handleSearchResults/////////////
//////////////////do i need all this shit that is in handleSearchResults  /////////////
//////////////////do i need all this shit that is in handleSearchResults/////////////
//////////////////do i need all this shit that is in handleSearchResults?///////////

//check for multiples is critical here
const checkForMultipleSearchTerms =()=> searchTermIsMultiple


/////gotta control if the entire list is fetched also

///////////new stuff the way it should be///////////////end
///////////new stuff the way it should be///////////////


///////////
// const handleSearchQuery = (searchTerm)=>{
  ///OK this needs to be divided//
  ///first parts are after query results come back
  //second part should be handled as the query is submitted
  // removeDomElements()
  // displayingHomeStore = false 
  // searchTermIsMultiple = false
  // listToPaginate = {}
  // if (haveDownloadedEntireList === true) {
  //   handleQueryAllInfoIsDownloaded(searchTerm)     
  // } else {
  //   if (!searchTerm.includes(' ')) {
  //     handleSingleQuery(searchTerm)
  //   } else {
  //         let multipleSearchTerms = handleMultipleSearchTerms.divideSearchTerms(searchTerm)
  //         getMultiFetches(multipleSearchTerms)
  //   }
  // }
// }

const handleQueryAllInfoIsDownloaded =(searchTerm)=> {
  currentListOfStores = entireListOfStores
if (!searchTerm.includes(' ')) {
  const filteredStoreList = filterResults(entireListOfStores, searchTerm)
  handlePossibleMatches(filteredStoreList)
} else {
  searchTermIsMultiple = true
  let multipleSearchTerms = handleMultipleSearchTerms.divideSearchTerms(searchTerm)
  const filteredStoreListMultSearch = filterMultiSearches(multipleSearchTerms)
  const combinedFilteredArray = [].concat(...filteredStoreListMultSearch)
  handlePossibleMatches(combinedFilteredArray)
} 
}

const filterMultiSearches = (multipleSearchTerms) => {
  const filteredStoreListMultSearch = new Array
  for (let i = 0; i < multipleSearchTerms.length; i++) {
    filteredStoreListMultSearch.push(filterResults(entireListOfStores, multipleSearchTerms[i]))
    filteredStoreListMultSearch[i].forEach(store => {
    store.searchedFor = multipleSearchTerms[i]
    })
  }
  return filteredStoreListMultSearch 
  
}

const handleSingleQueryResults = function (result, searchTerm){    
      currentListOfStores = [...result]
      handlePossibleMatches(result, searchTerm) 
    // })
    // .catch((err) => {
    //  console.log(`Error: ${err}`)
    // }) 
}

const handleMultipleSearchTerms = (function () {
  return {
    divideSearchTerms: function (searchTerm) {
      const multipleSearchTerms = searchTerm.split(' ')
      return multipleSearchTerms      
    }
  }
})()

function getMultiFetches (multipleSearchTerms) {
  searchTermIsMultiple = true
  let temporaryArray = []
  let fetches = [];
  for (let i = 0; i < multipleSearchTerms.length; i++) {
    fetches.push(
      getStoresSingleQuery(multipleSearchTerms[i], searchTermIsMultiple)
      .then(result => {
        result.forEach(store => {
          store.searchedFor = multipleSearchTerms[i]
        })
        temporaryArray.push(result)      
        console.log('temporaryArray: ', temporaryArray);
          }
      )
      .catch(status, err => {return console.log(status, err)})
    )
  }

  Promise.all(fetches).then(function() {    
    let combinedFetchArray = [].concat(...temporaryArray)

  const findMultiMatches = combinedFetchArray.reduce((stores, store) => {    
    stores[store.storeId] = ++stores[store.storeId] || 0
    return stores;
  }, {})

  let multiMatches = combinedFetchArray.filter(store => findMultiMatches[store.storeId])

    if (multiMatches.length < 1) {
        currentListOfStores = [...combinedFetchArray]    
        handlePossibleMatches(combinedFetchArray)
    } else {
      let combinedFetchArrayWODupes = [...new Set(combinedFetchArray)]
      const reorganizedArray = handleMultiMatches(multiMatches, combinedFetchArrayWODupes)
      currentListOfStores = [...reorganizedArray]
      handlePossibleMatches(reorganizedArray)
    }
  })
}

const handleMultiMatches =(multiMatches, combinedFetchArrayWODupes) => {
  for (let i = 0; i < multiMatches.length; i += 2) {
    const element = multiMatches[i];
    const storeId = element.storeId
    let storeToBeModified = combinedFetchArrayWODupes.find((store)=>{ 
      return store.storeId = storeId
    } )
    storeToBeModified.searchedFor = 'multiple matching search terms'
    const storeObjectToBeMovedPosition = combinedFetchArrayWODupes.indexOf(storeToBeModified)      
    let storeToBeMoved = combinedFetchArrayWODupes.splice(storeObjectToBeMovedPosition, 1)      
    combinedFetchArrayWODupes.unshift(storeToBeMoved[0])
    return combinedFetchArrayWODupes
  }    
}

const handlePossibleMatches = (possibleMatches, searchTerm) => {
  if (possibleMatches.length === 1){
    renderStoreAddress(possibleMatches)
  } else if (possibleMatches.length > 1 && possibleMatches.length <= 10) {
    let moreResultsToDisplay = false
    renderStores(possibleMatches, moreResultsToDisplay, currentListOfStores) 
  } else if (possibleMatches.length > 1) { 
    listToPaginate = possibleMatches
    getNext10OrFewerResults(currentListOfStores)
  } else if (haveDownloadedEntireList === true ){
    renderNoStoresFound()
  } else {
    getallStores(searchTerm)
    .then((result) => {
    console.log('have downloaded entire list')
    haveDownloadedEntireList = true
    entireListOfStores = result             
    possibleMatches = filterResults(entireListOfStores, searchTerm)       
    handlePossibleMatches(possibleMatches)
    })
    // .catch((err) => {
    // console.log(`Error: ${err}`)
    // })
  }
}

const getNext10OrFewerResults = (currentListOfStores) => {  
  if (listToPaginate.length > 10) {
    moreResultsToDisplay = true
  } else {
    moreResultsToDisplay = false
  }  
  const current10orFewerResults = listToPaginate.splice(0, 10)
  renderStores(current10orFewerResults, moreResultsToDisplay, currentListOfStores)  
}

const filterResults = function (stores, searchTerm){
  return stores.filter(function (store) {
    
    const isCityMatch = store.address.city.toLowerCase().includes(searchTerm.toString().toLowerCase())
    const isStreetAddressMatch = store.address.street.toLowerCase().includes(searchTerm.toString().toLowerCase())
    const isPostalCodeMatch = store.address.postalCode.includes(searchTerm)
    const isStoreNameMatch = store.storeName.toLowerCase().includes(searchTerm.toString().toLowerCase())

    
    return isCityMatch || isStreetAddressMatch || isPostalCodeMatch || isStoreNameMatch
  })
}

const handleHomeStore =() =>{
  let homeStore = preferredStore.initialize()

  if (homeStore !== 'none set') {
    displayingHomeStore = true

    const testFunction = async ()=> {
      const test = await getHomeStoreQuery(135)
      console.log('test: ', test);
      return test
    }

    testFunction().then((result) => {
      renderStoreAddress(result)
    })

  } else {
    displayingHomeStore = false
    renderSearchElement()
  }
}

handleHomeStore()

export { handleSingleQueryResults, haveDownloadedEntireList, checkForMultipleSearchTerms, getNext10OrFewerResults, listToPaginate, setDisplayingHomeStore, getStoreOpenStatus, getDisplayingHomestore, displayingHomeStore, currentListOfStores, setStoreOpenStatus, handleMultipleSearchTerms, getMultiFetches }


 

 
  
  
 
