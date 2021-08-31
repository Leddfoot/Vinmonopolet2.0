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
import { getStoresSingleQuery, getHomeStoreQuery } from './components/requests'
import { renderPageMainElement, renderTestSearch, renderStores, renderStoreAddress, renderNoStoresFound, renderHeader, renderClockDom, renderSearchElement, renderHomeStoreBar, renderTimeAndDate, removeDomElements } from './views/createPage'
import { preferredStore } from './components/preferenceStorage'

let haveDownloadedEntireList = false
let searchTermIsMultiple = false
let moreResultsToDisplay = false
let listToPaginate = []
let entireListOfStores = {}
let displayingHomeStore = false
let selectedStoreIsOpen = false
let currentListOfStores = {}

const setStoreOpenStatus = (status)=> {
  selectedStoreIsOpen = status
}
const setDisplayingHomeStore = (status)=> {
  displayingHomeStore = status
}
const setSearchTermIsMultiple = (status)=> {
  searchTermIsMultiple = status
}
const setHaveDownloadedEntireList = (status)=> {
  haveDownloadedEntireList = status
}
const setEntireListOfStores = (stores)=> {
  entireListOfStores = stores
}

const getSearchTermIsMultiple =()=> searchTermIsMultiple
const getDisplayingHomestore =()=> displayingHomeStore //used for deciding whether or not to render the 'make this my home store button'
const getStoreOpenStatus =()=> selectedStoreIsOpen //used for deciding if the countdown timer needs to be displayed
const getHaveDownloadedEntireList =()=> haveDownloadedEntireList //used for deciding if the countdown timer needs to be displayed
const getentireListOfStores =()=> entireListOfStores

renderPageMainElement()
//////////temporary////////////////////
renderTestSearch()
//////////temporary////////////////////
renderHeader()
renderClockDom()
renderHomeStoreBar()
renderTimeAndDate()

const handleQueryAllInfoIsDownloaded =(searchTerm)=> {
  removeDomElements()
  searchTermIsMultiple = getSearchTermIsMultiple()

if (!searchTermIsMultiple) {
  const filteredStoreList = filterResults(entireListOfStores, searchTerm)
  handlePossibleMatches(filteredStoreList)
  } else {
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
    storeToBeModified.searchedFor = 'matches multiple words searched for'
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
    getStoresSingleQuery(searchTerm, searchTermIsMultiple ,true)
    .then(() => {
    console.log('have downloaded entire list')
    setHaveDownloadedEntireList(true)           
    entireListOfStores = getentireListOfStores()      
    currentListOfStores = entireListOfStores     
    possibleMatches = filterResults(entireListOfStores, searchTerm)       
    handlePossibleMatches(possibleMatches)
    }).catch((err) => {
    console.log(`Error: ${err}`)
    })
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

export { setEntireListOfStores, handleQueryAllInfoIsDownloaded, handleSingleQueryResults, getHaveDownloadedEntireList, haveDownloadedEntireList, getSearchTermIsMultiple, getNext10OrFewerResults, setSearchTermIsMultiple, listToPaginate, setDisplayingHomeStore, getStoreOpenStatus, getDisplayingHomestore, displayingHomeStore, currentListOfStores, setStoreOpenStatus, handleMultipleSearchTerms, getMultiFetches }


 

 
  
  
 