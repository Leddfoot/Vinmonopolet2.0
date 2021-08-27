import { haveDownloadedEntireList, handleMultipleSearchTerms, getMultiFetches } from '../index.js'
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
        removeDomElements()

        ///this should know if whole list is downloaded, if so send the search term to ?handlepossiblematches
              
        // if (haveDownloadedEntireList === true) {
        //   //  handleQueryAllInfoIsDownloaded(searchTerm) 
        //   console.log('should return')
        //    return    
        // }    
        // console.log('did not return, HAVE not dled entire list')

        if (searchInput.value === ''){
        return
      }

      let searchTerm = searchInput.value  
      searchTerm = searchTerm.trim()

      checkInputForMultipleSearchTerms(searchTerm)
    }   
  
    searchInput.addEventListener('keydown', submitWithEnterButton)
    function submitWithEnterButton(e) { 
        if (e.code === 'Enter') {
            
          e.preventDefault()
    
          if (searchInput.value === ''){
          return
        }
        let searchTerm = searchInput.value
    
        searchTerm = searchTerm.trim()
        checkInputForMultipleSearchTerms(searchTerm)
        }
    }

  } 

  //NOte: this may be a little confusing because there are 2 functions checking for multiple search terms
  //the other function uses a boolean to decide how to render, the function below is going to handle the querie(s)
  const checkInputForMultipleSearchTerms = (searchTerm)=>{
    if (!searchTerm.includes(' ')) {
      getStoresSingleQuery(searchTerm)
    } else {
          let multipleSearchTerms = handleMultipleSearchTerms.divideSearchTerms(searchTerm)
          getMultiFetches(multipleSearchTerms)
    }
  
}



  export { createSearchEventHandler }