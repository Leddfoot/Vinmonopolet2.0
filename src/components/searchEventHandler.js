import { handleSearchQuery } from '../index.js'

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
      let searchTerm = searchInput.value
  
      searchTerm = searchTerm.trim()
      handleSearchQuery(searchTerm) 
    }   
  
    searchInput.addEventListener('keydown', submitWithEnterButton)
    function submitWithEnterButton(e) { 
        if (e.code === 'Enter') {
            
          e.preventDefault()
          let searchInput = document.querySelector('.input')
          let searchTerm = searchInput.value
          
          if (searchTerm === ''){
            return
          }    
          searchTerm = searchTerm.trim()
          console.log('searchTerm: ', searchTerm);
          handleSearchQuery(searchTerm)
        }
    }
  }

  

  export { createSearchEventHandler }