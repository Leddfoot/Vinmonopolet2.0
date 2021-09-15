import { handleQueryAllInfoIsDownloaded, setSearchTermIsMultiple, handleMultipleSearchTerms, getMultiFetches, getSearchTermIsMultiple, getHaveDownloadedEntireList } from '../index.js'
import { removeDomElements } from '../views/createPage.js'
import {  getStoresSingleQuery } from './requests'

//search box
const createSearchEventHandler=()=>{
    //2 event handlers for this to activate keyboard only selection (a11y)
    let searchInput = document.querySelector('.input')    
    const searchInputButton = document.querySelector('#search-button')    

    searchInputButton.addEventListener('click', submitWithButtonClick)
    function submitWithButtonClick (e) {
        e.preventDefault()
        if (searchInput.value === ''){
        return
      }
      removeDomElements('list-of-store-choices')
      removeDomElements('aria-count-down-element')
      removeDomElements('no-stores-found')
      let searchTerm = searchInput.value  
      searchTerm = searchTerm.trim()
      setSearchTermIsMultiple(false)
      checkInputForMultipleSearchTerms(searchTerm)
    }   
  
    searchInput.addEventListener('keydown', submitWithEnterButton)
    function submitWithEnterButton(e) { 
        if (e.code === 'Enter') {            
          e.preventDefault()    
          if (searchInput.value === ''){
          return
        }
        removeDomElements('list-of-store-choices')
        removeDomElements('aria-count-down-element')
        removeDomElements('no-stores-found')
        let searchTerm = searchInput.value    
        searchTerm = searchTerm.trim()
        setSearchTermIsMultiple(false)
        checkInputForMultipleSearchTerms(searchTerm)
        }
    }

  } 

//NOte: this may be a little confusing because there are 2 functions checking for multiple search terms
//the other function uses a boolean to decide how to render(show contains search query), the function below is going to handle the querie(s)
const checkInputForMultipleSearchTerms = (searchTerm)=>{
    if (!searchTerm.includes(' ')) {
      setSearchTermIsMultiple(false)
      handleQuerySubmission(searchTerm)
    } else {
      setSearchTermIsMultiple(true)
      let multipleSearchTerms = handleMultipleSearchTerms.divideSearchTerms(searchTerm)
      handleQuerySubmission(multipleSearchTerms)
    }  
}

const handleQuerySubmission =(searchTerm)=> { //This is what makes everything efficient, if the entire data set has been downloaded we don't query the API anymore
  const searchTermIsMultiple = getSearchTermIsMultiple()
  const haveDownloadedEntireList = getHaveDownloadedEntireList()

  if (!haveDownloadedEntireList) {
    if (!searchTermIsMultiple) {
      getStoresSingleQuery(searchTerm)
     
    } else {
      getMultiFetches(searchTerm)
    }
  } else {
    console.log('here is th e bullshti')
    handleQueryAllInfoIsDownloaded(searchTerm)
  }
}



  export { createSearchEventHandler }