import { setSelectedStoreHolidays, filteredHoliday, todayDateForDisplay, generateStoreOpenStatus, convertTimeStringToProperDate, formatCurrentTime, getTodayNumericConvertedToVinmonpolet } from '../components/dateCalculations'
import { preferredStore } from '../components/preferenceStorage'
import { getSearchTermIsMultiple, getNext10OrFewerResults, setDisplayingHomeStore, getDisplayingHomestore, getStoreOpenStatus } from '../index'
import { createSearchEventHandler } from '../components/searchEventHandler'
import { generateClock } from '../components/clock'

let displayingIndividualStore = false

const renderPageMainElement = ()=> {
    const pageMainElement = document.createElement('div')
    pageMainElement.setAttribute('id', 'page-main-element')
    const htmlBody = document.querySelector('body')
    htmlBody.appendChild(pageMainElement)
}

let pageMainElement = document.getElementById('page-main-element')

const generateHeaderDOM = () => {
    const headerElement = document.createElement('header')
    headerElement.setAttribute('id', 'main-header')
    const pageTitleElement = document.createElement('span')
    pageTitleElement.setAttribute('id', 'page-title')
    pageTitleElement.textContent = 'OH SH!T is my vinmonopolet still open?&!*?'
    headerElement.appendChild(pageTitleElement)

    return headerElement        
}

const renderHeader =() => {
    const headerElement = generateHeaderDOM()
    const pageMainElement = document.getElementById('page-main-element')
    pageMainElement.appendChild(headerElement)
}

const generateClockDom=()=>{
    let canvas = document.createElement('canvas')
    canvas.setAttribute('id', 'canvas')
    canvas.setAttribute('width', '60')
    canvas.setAttribute('height', '60')
    canvas.setAttribute('aria-label', 'clock with current time')
    generateClock(canvas)
    return canvas
}

const renderClockDom =()=> {
    const clock = generateClockDom()
    let mainHeader = document.getElementById('main-header')
    mainHeader.appendChild(clock)
}

const generateTimeAndDateDOM =()=> {
    let timeAndDateElement = document.createElement('div')
    let timeWrapperDiv = document.createElement('div')
    timeWrapperDiv.setAttribute('id', 'time-wrapper-div')
    timeAndDateElement.setAttribute('id', 'time-and-date-element')
    const timeElement = document.createElement('p')
    timeElement.setAttribute('id', 'time-element')
    let dateWrapperDiv = document.createElement('div')
    dateWrapperDiv.setAttribute('id', 'date-wrapper-div')
    const dateElement = document.createElement('p')
    dateElement.setAttribute('id', 'date-element')    
    dateElement.textContent = todayDateForDisplay
    // let homeStoreButtonWrapper = document.createElement('div')
    // homeStoreButtonWrapper.setAttribute('id', 'home-store-button-wrapper')
    // console.log('homeStoreButtonWrapper: ', homeStoreButtonWrapper);
    // timeAndDateElement.appendChild(homeStoreButtonWrapper)
    // let homeStoreButton = generateHomeStoreButtonDom()
    // console.log('homeStoreButton: ', homeStoreButton);
    // homeStoreButtonWrapper.appendChild(homeStoreButton)
    

    
    timeAndDateElement.appendChild(dateWrapperDiv)
    dateWrapperDiv.appendChild(dateElement)
    timeAndDateElement.appendChild(timeWrapperDiv)
    timeWrapperDiv.appendChild(timeElement)

    // console.log('homeStoreButtonWrapper: ', homeStoreButtonWrapper);
 
    setInterval(function() {
        const nowClock = formatCurrentTime()
        timeElement.textContent = nowClock        
    }, 1000) 

    return timeAndDateElement
}

const renderTimeAndDate =() => {
    const timeAndDateElement = generateTimeAndDateDOM()
    const pageMainElement = document.getElementById('page-main-element')
    pageMainElement.appendChild(timeAndDateElement)
}

const renderTestSearch=()=>{
    const bsdiv = document.createElement('div')

pageMainElement = document.getElementById('page-main-element')
// const testButton = document.createElement('button')
// const testSearchForm = document.createElement('form')
// const testSearchInput = document.createElement('input')

// testSearchForm.setAttribute('id', 'test-search-form')
// testSearchInput.setAttribute('id', 'test-search-input')
// testSearchInput.setAttribute('label', 'some bullshit')
// testButton.textContent = 'some bullshit'
// bsdiv.appendChild(testSearchForm)
// testSearchForm.appendChild(testSearchInput)
// testSearchForm.appendChild(testButton)


// const messageOne = document.createElement('div')
// const messageTwo = document.createElement('div')
// messageOne.setAttribute('id', 'message-one')
// messageTwo.setAttribute('id', 'message-two')
// messageOne.textContent = 'zzzzzzzzzzzzzz'
// messageTwo.textContent = 'zzzzzzzzzzzzzz'
// bsdiv.appendChild(messageOne)
// bsdiv.appendChild(messageTwo)
pageMainElement.appendChild(bsdiv)
renderTempBullshit()


// testSearchForm.addEventListener('submit', (e)=> {
//     e.preventDefault()
//     let preliminarySearchTerm = testSearchInput.value
//     ////////////
//     messageOne.textContent = `Searching For ${preliminarySearchTerm}`
//     messageTwo.textContent = `LOADING LOADING `
//     ///////////
//     const searchTerm = preliminarySearchTerm.trim().toLowerCase()
//     console.log('searchTerm: ', searchTerm);
//     fetchStoreInfo(searchTerm)
   

// })

}

const renderTempBullshit =()=>{
  

 

  

    ///////fa test//////start//////
    ///////fa test////////////
    const faTemporary = document.createElement('script')
    faTemporary.setAttribute('src', 'https://kit.fontawesome.com/7d47c5782b.js')
    faTemporary.setAttribute('crossorigin', 'anonymous')
    document.head.appendChild(faTemporary);
    // console.log('temphtml: ', temphtml);
    // temphtml.appendChild(faTemporary)
    ///////fa test//////end//////
    ///////fa test////////////
    const testWrapper = document.createElement('div')
    const leftTop = document.createElement('div')
    const leftBottom = document.createElement('div')
    const right = document.createElement('div')
    const testIcon = document.createElement('icon')
    const testButton = document.createElement('button')

    testWrapper.setAttribute('class', 'test-wrapper')
    leftTop.setAttribute('class', 'left-top')
    leftBottom.setAttribute('class', 'left-bottom')
    right.setAttribute('class', 'right')
    testIcon.setAttribute('class', 'fas fa-check-square')
    testWrapper.setAttribute('class', 'test-wrapper')
    testWrapper.setAttribute('class', 'test-wrapper')

    testWrapper.appendChild(leftTop)
    testWrapper.appendChild(leftBottom)

    right.appendChild(testIcon)
    testButton.textContent = 'bla bla bla'
    right.appendChild(testButton)

    testWrapper.appendChild(right)

    pageMainElement.appendChild(testWrapper)

 
  
}


/////////////////temporary todo and styled fa search stuff////end///////
/////////////////temporary todo and styled fa search stuff///////////

const generateSearchInputDOM =()=> {  

    const searchWrap = document.createElement('div')
    searchWrap.setAttribute('class', 'search-wrap')
    searchWrap.setAttribute('id', 'main-search-form') //needs this only when being destroyed in js
    const searchBox = document.createElement('div')
    searchBox.setAttribute('class', 'search-box')
    const searchInputElement = document.createElement('input')
    searchInputElement.setAttribute('type', 'text')
    searchInputElement.setAttribute('role', 'search')
    searchInputElement.setAttribute('class', 'input')
    searchInputElement.setAttribute('class', 'input')
    searchInputElement.setAttribute('placeholder', 'Enter a city, store name, or postal code')

    const buttonWrapper = document.createElement('div')
    buttonWrapper.setAttribute('class', 'btn btn-common')


    const searchButtonElement = document.createElement('button')
    searchButtonElement.setAttribute('id', 'search-button') 
    const searchIcon = document.createElement('i')
    searchIcon.setAttribute('class', 'fas fa-search')

    searchWrap.appendChild(searchBox)
    searchBox.appendChild(searchInputElement)
    searchBox.appendChild(buttonWrapper)
    buttonWrapper.appendChild(searchButtonElement)
    buttonWrapper.appendChild(searchButtonElement)
    searchButtonElement.appendChild(searchIcon)


    return searchWrap
}

const renderSearchElement =()=> {
    const pageMainElement = document.getElementById('page-main-element')
    const searchInputForm = generateSearchInputDOM()    
    pageMainElement.appendChild(searchInputForm)
    createSearchEventHandler() 
}

const generateStoreDOM = (store) => {
    const storeInfo = {...store}
    const storeElement = document.createElement('span')
    const storeTextElement = document.createElement('p')    
    storeTextElement.textContent = `${storeInfo.storeName} is located at ${storeInfo.address.street}, ${storeInfo.address.postalCode} ${storeInfo.address.city}`        
    storeElement.appendChild(storeTextElement)
    
    return storeElement
}

const generateStorehoursHolidayDOM = () => {
    const holidayHoursElement = document.createElement('span')
    const holidayStatusTextElement = document.createElement('p')
    const holidayOpenHours = document.createElement('p')
    if (filteredHoliday[0].openingTime === undefined) {
        holidayStatusTextElement.textContent = `The E-Lager is not open to the public`
    }
    if (filteredHoliday[0].openingTime === "") {
        holidayStatusTextElement.textContent = `This store is closed all day due to: ${filteredHoliday[0].message}`
    } else {
        holidayStatusTextElement.textContent = `This store is open for limited hours on this daydue to: ${filteredHoliday[0].message}`
        holidayOpenHours.textContent = `This store will be open from ${filteredHoliday[0].openingTime} until ${filteredHoliday[0].closingTime}`
    }

    holidayHoursElement.appendChild(holidayStatusTextElement)
    holidayHoursElement.appendChild(holidayOpenHours)
     
    return holidayHoursElement
}

const generateStoreOpeningHoursDOM=(openingHoursText)=>{
    let openingHoursElement = document.createElement('div')
    openingHoursElement.setAttribute('id', 'opening-hours-element')
    openingHoursElement.textContent = openingHoursText
    return openingHoursElement
}

const generateStoreOpeningHoursText = (storeStatus, store) => {
    const selectedStore = store[0]
    let openingHoursElement = document.getElementById('opening-hours-element')
    const todayIntegerConverted = getTodayNumericConvertedToVinmonpolet()
    const closesTodayAt = selectedStore.openingHours.regularHours[todayIntegerConverted].closingTime    
    const opensTodayAt = selectedStore.openingHours.regularHours[todayIntegerConverted].openingTime

    if (openingHoursElement !== null) {openingHoursElement.parentElement.removeChild(openingHoursElement)}

    if (selectedStore.storeId === '801'){
        const openingHoursText = 'The E lager is not open to the public'
        let openingHoursElement = generateStoreOpeningHoursDOM(openingHoursText)        
        renderStoreOpeningHours(openingHoursElement, store)        
        return
    }
    if (storeStatus.closedAllDay === true){
        const openingHoursText = 'The store is closed all day Today'
        let openingHoursElement = generateStoreOpeningHoursDOM(openingHoursText)        
        renderStoreOpeningHours(openingHoursElement, store)
        return
    }
    if(storeStatus.hasClosed === true) { 
        const openingHoursText = `This store has already closed today at ${closesTodayAt}`
        const todayNumericVinmonopolet = getTodayNumericConvertedToVinmonpolet()
        let thisDayHasBeenChecked = true
        let doNotMakeButtonsNow = true
        let displayingHomeStore = getDisplayingHomestore()
        let storeInfoContentHolder = document.getElementById('store-info-content-holder')

        let openingHoursElement = generateStoreOpeningHoursDOM(openingHoursText)
        renderStoreOpeningHours(openingHoursElement, store, doNotMakeButtonsNow)
        findNextOpenDay(store, todayNumericVinmonopolet, thisDayHasBeenChecked)
        // decideAndRenderButtons(displayingHomeStore, storeInfoContentHolder, store)
        renderSearchAgainButton()
        return
    }
    if(storeStatus.hasOpened === false) {
        const openingHoursText = `This store will open today at ${opensTodayAt} and closes at ${closesTodayAt}`
        let openingHoursElement = generateStoreOpeningHoursDOM(openingHoursText)
        renderStoreOpeningHours(openingHoursElement, store)            
        return
    }
    const openingHoursText = `This store is currently open. `
    openingHoursElement = generateStoreOpeningHoursDOM(openingHoursText)
    renderStoreOpeningHours(openingHoursElement, store)


}

const renderStoreOpeningHours =(openingHoursElement, store, doNotMakeButtonsNow)=> {
    removeDomElements('opening-hours-element')
    let displayingHomeStore = getDisplayingHomestore()
    let storeInfoContentHolder = document.getElementById('store-info-content-holder')
    storeInfoContentHolder.appendChild(openingHoursElement)
    if (!doNotMakeButtonsNow) {
        // decideAndRenderButtons(displayingHomeStore, storeInfoContentHolder, store)
        renderSearchAgainButton()
    }
}

const makeCurrentlyDisplayedStorePersisent = (store)=>{
    let temporaryStorage = window.sessionStorage
    temporaryStorage.setItem('currentlySelectedStore', JSON.stringify(store))   
}

const renderStoreAddress = (store) => { 
    // console.log('store: ', store);
    if (store[0].storeId === '801') {
        renderNoStoresFound()
        return
    }

    if (store[0].storeId === '122' && store[0].status === 'Temporarily closed') { //This can removed after the store reopens, but will work when it does
        renderNoStoresFound()
        return
    }
    
    displayingIndividualStore = true
    let displayingHomeStore = getDisplayingHomestore()
    makeCurrentlyDisplayedStorePersisent(store)

    let temporaryStorage = window.sessionStorage
    let storeInfoArray = JSON.parse(temporaryStorage.getItem('currentlySelectedStore'))
    let storeInfo = storeInfoArray[0]
    removeDomElements()
    removeDomElements('search-form')

    let storeInfoContentHolder = document.createElement('div')
    storeInfoContentHolder.setAttribute('id', 'store-info-content-holder')

    const storeElement = generateStoreDOM(storeInfo)
    const pageMainElement = document.getElementById('page-main-element')
    pageMainElement.appendChild(storeInfoContentHolder)
    storeInfoContentHolder.appendChild(storeElement)  
    // console.log('store: ', store);
    
    const holidays = storeInfo.openingHours.exceptionHours
    setSelectedStoreHolidays(holidays)

    if (filteredHoliday !== null ) {           
        const holidayHoursElement = generateStorehoursHolidayDOM()
        storeInfoContentHolder.appendChild(holidayHoursElement) 
        // decideAndRenderButtons(displayingHomeStore, storeInfoContentHolder, store)
        renderSearchAgainButton()
    } else {
        const storeStatus = generateStoreOpenStatus(store)
        generateStoreOpeningHoursText(storeStatus, store)
    }

}

// const decideAndRenderButtons =(displayingHomeStore, storeInfoContentHolder)=> {
//     let timeAndDateElement = document.getElementById('time-and-date-element')
//      if (displayingHomeStore === false) {
//         let homeStoreButton = generateHomeStoreButtonDom()
//         let searchAgainButton = renderSearchAgainButton()
//         storeInfoContentHolder.appendChild(searchAgainButton)        
//         timeAndDateElement.appendChild(homeStoreButton)
//     } else {
//         let searchAgainButton = renderSearchAgainButton()
//         storeInfoContentHolder.appendChild(searchAgainButton) 
//     }
// }

const renderCountdownElement =(timeRemaining)=>{

    let displayingHomeStore = getDisplayingHomestore()
    let storeInfoContentHolder = document.getElementById('store-info-content-holder')
    let countDownElement = document.createElement('span')    
    countDownElement.setAttribute('id', 'count-down-element')
    countDownElement.textContent = 'store closes in:'

    countDownElement = document.getElementById('count-down-element')
    let homeStoreButton = document.getElementById('home-store-button')
    let searchAgainButton = document.getElementById('search-again-button')

    if (countDownElement) {countDownElement.parentElement.removeChild(countDownElement)}      
    // if (homeStoreButton !== null) {homeStoreButton.parentElement.removeChild(homeStoreButton)}      
    if (searchAgainButton !== null) {searchAgainButton.parentElement.removeChild(searchAgainButton)} 
   
    // decideAndRenderButtons(displayingHomeStore, storeInfoContentHolder)  
    renderSearchAgainButton(storeInfoContentHolder)


    let openingHoursElement = document.getElementById('opening-hours-element')
    countDownElement = document.createElement('span')
    countDownElement.setAttribute('id', 'count-down-element')
    const storeClosesInText = createCountdownText(timeRemaining)
    countDownElement.textContent = storeClosesInText
    openingHoursElement.appendChild(countDownElement) 
}

const createCountdownText =(timeRemaining)=>{
    const hoursRemaining = timeRemaining.hours
    const minutesRemaining = timeRemaining.minutes
    const secondsRemaining = timeRemaining.seconds

    const hoursText = (hoursRemaining > 1) ? 'hours' : 'hour'
    const minutesText = (minutesRemaining !== 1) ? 'minutes' : 'minute'
    const secondsText = (secondsRemaining !== 1) ? 'seconds' : 'second'
    if (hoursRemaining === 0 && minutesRemaining === 0) {
        return `The store closes in ${secondsRemaining} ${secondsText}`
    } else if(hoursRemaining === 0 && minutesRemaining !== 0){
        return `The store closes in ${minutesRemaining} ${minutesText} and ${secondsRemaining} ${secondsText}`
    } else {
        return `The store closes in ${hoursRemaining} ${hoursText} ${minutesRemaining} ${minutesText} and ${secondsRemaining} ${secondsText}`
    }
}

let countdownTimer = setInterval(function() {
    const storeIsOpen = getStoreOpenStatus()
    const convertedNumericToday = getTodayNumericConvertedToVinmonpolet()
    let temporaryStorage = window.sessionStorage
    const currentlySelectedStore = JSON.parse(temporaryStorage.getItem('currentlySelectedStore'))
      
    if (displayingIndividualStore === false || !storeIsOpen) {  
        return
    } else {
        const closesTodayAt = currentlySelectedStore[0].openingHours.regularHours[convertedNumericToday].closingTime
        const closingTimeConverted = convertTimeStringToProperDate(closesTodayAt)
        let now = new Date().getTime()
        let timeLeft = closingTimeConverted - now
        // console.log('timeLeft: ', timeLeft);
        let timeUntilClosing = {}
        timeUntilClosing.hours = Math.floor( (timeLeft/(1000*60*60)) % 24 )
        timeUntilClosing.minutes = Math.floor( (timeLeft/1000/60) % 60 )
        timeUntilClosing.seconds = Math.floor( (timeLeft/1000) % 60 )

        renderCountdownElement(timeUntilClosing)
        if (timeLeft < 0) {
            const storeStatus = generateStoreOpenStatus(currentlySelectedStore)
            console.log('storeStatus: ', storeStatus);
            generateStoreOpeningHoursText(storeStatus, currentlySelectedStore)
 
            let countDownElement = document.getElementById('count-down-element')
            let homeStoreButton = document.getElementById('home-store-button')
            let searchAgainButton = document.getElementById('search-again-button')
                    
            if (countDownElement) {countDownElement.parentElement.removeChild(countDownElement)}      
            // if (homeStoreButton !== null) {homeStoreButton.parentElement.removeChild(homeStoreButton)}      
            if (searchAgainButton !== null) {searchAgainButton.parentElement.removeChild(searchAgainButton)}

            clearInterval(countdownTimer)
            console.log('CountDown Finished');
        }
        
    }

}, 1000);

const findNextOpenDay = (store, todayNumericVinmonopolet, thisDayHasBeenChecked)=> {
    //NOTE THIS IS ONLY USED AFTER THE STORE HAS CLOSED FOR TODAY, and that stores are not open on Sundays
    //That is why the 5(saturday) is used below to check monday
    //Note JS uses 0 to represent sunday, vinmonpolet uses 0 to represent monday     
     const openingTimes = store[0].openingHours.regularHours     

     if (todayNumericVinmonopolet === 5) { //
        let thisDayHasBeenChecked = false
        findNextOpenDay(store, 0, thisDayHasBeenChecked)
        return
     } 

     const nextDay = (thisDayHasBeenChecked === false)? todayNumericVinmonopolet : todayNumericVinmonopolet + 1
     const isClosedOnThisDay = openingTimes[nextDay].closed

     if (isClosedOnThisDay === true) { //the api uses this to show closed all day
        findNextOpenDay(store, todayNumericVinmonopolet + 2, false)
     } else {
         const nextOpeningWeekday = openingTimes[nextDay].dayOfTheWeek
         const nextOpeningTime = openingTimes[nextDay].openingTime
         generateNextOpenInfo(nextOpeningTime, nextOpeningWeekday)
     }   
}

const generateNextOpenInfo =(nextOpeningTime, nextOpeningWeekday) =>{
    const nextTimeOpenText = `This store will open again at ${nextOpeningTime} on ${nextOpeningWeekday}`
    const storeInfoContentHolder = document.getElementById('store-info-content-holder')
    const nextOpenHolder = document.createElement('span')
    nextOpenHolder.textContent += nextTimeOpenText
    storeInfoContentHolder.appendChild(nextOpenHolder)    
}


const renderSearchAgainButton =()=>{
    let searchAgainButton = document.createElement('button')
    searchAgainButton.textContent = 'CHECK ANOTHER STORE'
    searchAgainButton.setAttribute('id', 'search-again-button')
    
    searchAgainButton.addEventListener("click", (e) => {
        const temporaryStorage = window.sessionStorage
        temporaryStorage.clear()
        displayingIndividualStore = false
        removeDomElements()
        renderSearchElement()     
    })
    ////////////////////temporary////////////////
    ////////////////////temporary////////////////
    const storeInfoContentHolder = document.getElementById('store-info-content-holder')
        ////////////////////temporary////////////////
    ////////////////////temporary////////////////
    storeInfoContentHolder.appendChild(searchAgainButton)
}

const renderHomeStoreBar =()=> {
    const storeInfoContentHolder = document.getElementById('store-info-content-holder')
}
const generateHomeStoreButtonDom =()=> {
    const isHomeStore = getDisplayingHomestore()
    

    let homeStoreButton = document.createElement('button')
    homeStoreButton.textContent = 'Home Store '
    homeStoreButton.setAttribute('id', 'home-store-button') 
    let homeStoreIndicator = document.createElement('icon') 
    
    if (isHomeStore) {
        homeStoreIndicator.setAttribute('class', 'fas fa-check-square') //is home store
        homeStoreIndicator.setAttribute('aria-labelledby', 'checkbox')
        homeStoreIndicator.setAttribute('aria-describedby', 'an indicator displaying if this is your homestore. It is set to true')
    } else {
        homeStoreIndicator.setAttribute('class', 'far fa-square')
        homeStoreIndicator.setAttribute('aria-labelledby', 'checkbox')
        homeStoreIndicator.setAttribute('aria-describedby', 'an indicator displaying if this is your homestore. It is set to false')

    }
    homeStoreButton.append(homeStoreIndicator) 
    // homeStoreButtonWrapper.appendChild(homeStoreButton)

    homeStoreButton.addEventListener("click", (e) => {
        e.preventDefault()
        setDisplayingHomeStore(true)     
        // let storeInfoContentHolder = document.getElementById('store-info-content-holder')
        let temporaryStorage = window.sessionStorage
        let currentlySelectedStore = JSON.parse(temporaryStorage.getItem('currentlySelectedStore'))
        preferredStore.setHomeStore(currentlySelectedStore[0].storeName)               
        // removeDomElements('home-store-button')
        // let searchAgainButton = document.getElementById('search-again-button')
        // if (!searchAgainButton) {
        // let searchAgainButton = renderSearchAgainButton()
        // storeInfoContentHolder.appendChild(searchAgainButton)  
        // }
    })
    return homeStoreButton
}

const generateSelectStoreDOMWithSearchTerm = (store) => {
    let storeElement = document.createElement('button')
    storeElement.textContent =  `${store.storeName}`  
    storeElement.setAttribute('id', store.storeId) 
    storeElement.textContent += ` Contains: ${store.searchedFor}`   
    storeElement.classList.add('clickable')

    return storeElement
}

const generateSelectStoreDOM = (store) => {
    const storeElement = document.createElement('span')
    const storeTextElement = document.createElement('button') 
    storeTextElement.textContent = store.storeName   
    storeTextElement.setAttribute('id', store.storeId)    
    storeTextElement.classList.add('clickable')
    storeElement.appendChild(storeTextElement)  

    return storeElement
}

const selectThisStore =(id, stores)=> {
    // console.log('stores: ', stores);
    removeDomElements()
    let filteredStore = stores.filter(store => store.storeId === id)    
    renderStoreAddress(filteredStore)
    
}

const renderStores = (stores, moreResultsToDisplay, currentListOfStores) => { 
    
    displayingIndividualStore = false
    let showMoreResultsButtonExists = document.getElementById('show-more-results')
    if (showMoreResultsButtonExists !== null) {
        showMoreResultsButtonExists.remove()
    }
    let storeInfoContentHolder

    let storeInfoContentHolderAlreadyExists = !!document.getElementById('store-info-content-holder')

    if (storeInfoContentHolderAlreadyExists) {
        storeInfoContentHolder = document.getElementById('store-info-content-holder')
    } else {
        storeInfoContentHolder = document.createElement('span')
        storeInfoContentHolder.setAttribute('id', 'store-info-content-holder')
        pageMainElement.appendChild(storeInfoContentHolder)
    }

    let addSearchedFor = getSearchTermIsMultiple()

        if (addSearchedFor) {
            stores.forEach((store) => {
                let storeElement = generateSelectStoreDOMWithSearchTerm(store)
                storeInfoContentHolder.appendChild(storeElement)
        })
        } else {
            stores.forEach((store) => {
                
                let storeElement = generateSelectStoreDOM(store)
                storeInfoContentHolder.appendChild(storeElement)
        })
    } 
    
    ///test
    // createClickableElementsEventHandler()
    const clickableElements = document.querySelectorAll('.clickable')
  
    clickableElements.forEach((button)=> {
    button.addEventListener("click", (event) => {
        event.preventDefault()
        selectThisStore(event.target.id, currentListOfStores) 
        console.log('currentListOfStores: ', currentListOfStores);
        
    })
    })

    if (moreResultsToDisplay) {
        let showMoreResultsButton = document.createElement('button')
        showMoreResultsButton.setAttribute('id', 'show-more-results')
        showMoreResultsButton.textContent = 'SHOW MORE RESULTS'
        storeInfoContentHolder.appendChild(showMoreResultsButton) 
        showMoreResultsButton.addEventListener('click', (e)=> {
            ///append
            e.preventDefault()
            getNext10OrFewerResults(currentListOfStores)
        } )
    }
}
  
const renderNoStoresFound =()=> { 
    let storeInfoContentHolder = document.createElement('div')
    storeInfoContentHolder.setAttribute('id', 'store-info-content-holder')  
    const searchAgainTextElement = document.createElement('h1')    
    searchAgainTextElement.textContent = 'No stores Found. Search Again'
    storeInfoContentHolder.appendChild(searchAgainTextElement)
    pageMainElement.appendChild(storeInfoContentHolder) 
}

const removeDomElements = (elementsToDestroy) => {
    let toDestroy
    if (elementsToDestroy === 'home-store-button') {
        toDestroy = document.getElementById('home-store-button-wrapper')
        // toDestroy = document.getElementById('home-store-button')
 
    } else if (elementsToDestroy === 'search-form') {
        toDestroy = document.getElementById('main-search-form')
    } else if (elementsToDestroy === 'opening-hours-element') {
        toDestroy = document.getElementById('opening-hours-element')
    } else {
        toDestroy = document.getElementById('store-info-content-holder')
    }

    if (toDestroy) {
        if (toDestroy.firstChild){
            while(toDestroy.firstChild !== null) {
                toDestroy.removeChild(toDestroy.firstChild)
                    }
                    toDestroy.parentElement.removeChild(toDestroy)
        }
    } 
}


export { renderPageMainElement, renderStores, renderStoreAddress, renderTestSearch, renderNoStoresFound, renderHeader, renderClockDom, renderHomeStoreBar, renderSearchElement, renderTimeAndDate, removeDomElements }
