import { setSelectedStoreHolidays, filteredHoliday, todayDateForDisplay, generateStoreOpenStatus, convertTimeStringToProperDate, formatCurrentTime, getTodayNumericConvertedToVinmonpolet } from '../components/dateCalculations'
import { preferredStore } from '../components/preferenceStorage'
import { getSearchTermIsMultiple, getNext10OrFewerResults, setDisplayingHomeStore, getDisplayingHomestore, getStoreOpenStatus } from '../index'
import { createSearchEventHandler } from '../components/searchEventHandler'
import { generateClock } from '../components/clock'
import gloriousLiquor from '../img/gloriousLiquor.jpg'

let displayingIndividualStore = false

const renderScriptTag =()=>{
    const faScriptTag = document.createElement('script')
    faScriptTag.setAttribute('src', 'https://kit.fontawesome.com/7d47c5782b.js')
    faScriptTag.setAttribute('crossorigin', 'anonymous')
    document.head.appendChild(faScriptTag);
}

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
    pageTitleElement.textContent = 'OH SH!T! Is my vinmonopolet still open?!?'
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
    
    timeAndDateElement.appendChild(dateWrapperDiv)
    dateWrapperDiv.appendChild(dateElement)
    timeAndDateElement.appendChild(timeWrapperDiv)
    timeWrapperDiv.appendChild(timeElement)

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

const renderHomeStoreButton =()=>{
    let homeStoreButton = generateHomeStoreButtonDom()
    pageMainElement = document.getElementById('page-main-element')
    document.body.prepend(homeStoreButton)

}

const generateHomeStoreButtonDom =()=> {
    const isHomeStore = getDisplayingHomestore()
    const homeStoreButton = document.createElement('div')
    const homeStoreText = document.createElement('p')
    const homeStoreIcon = document.createElement('icon')

    homeStoreButton.setAttribute('id', 'home-store-button')
    homeStoreText.setAttribute('id', 'home-store-text')
    homeStoreButton.setAttribute('aria-role', 'button')
    homeStoreButton.setAttribute('aria-description', 'selects or unselects the current store as your home store, if the text is select as home store, it is not the chosen store')
        
    if (isHomeStore) {
                homeStoreIcon.setAttribute('class', 'fas fa-check-square') //is home store
                homeStoreIcon.setAttribute('aria-labelledby', 'checkbox')
                homeStoreIcon.setAttribute('aria-describedby', 'an indicator displaying if this is your homestore. It is set to true')
                homeStoreText.textContent = 'This is your home Store' 
            } else {
                homeStoreIcon.setAttribute('class', 'far fa-square')
                homeStoreIcon.setAttribute('aria-labelledby', 'checkbox')
                homeStoreIcon.setAttribute('aria-describedby', 'an indicator displaying if this is your homestore. It is set to false')
                homeStoreText.textContent = 'Set as your home store'
            }

    homeStoreButton.appendChild(homeStoreText)
    homeStoreButton.appendChild(homeStoreIcon)

    homeStoreButton.addEventListener("click", (e) => {
        e.preventDefault()
        
        let isHomeStore = getDisplayingHomestore()

        if (!isHomeStore) {
            let temporaryStorage = window.sessionStorage
            let currentlySelectedStore = JSON.parse(temporaryStorage.getItem('currentlySelectedStore'))
            preferredStore.setHomeStore(currentlySelectedStore[0].storeId)
            removeDomElements('home-store-button') 
            setDisplayingHomeStore(true)
            renderHomeStoreButton()    
        }
    })
    return homeStoreButton
}

const generateSearchInputDOM =()=> {  

    const searchWrap = document.createElement('div')
    searchWrap.setAttribute('class', 'search-wrap')
    searchWrap.setAttribute('id', 'main-search-form') //needs this when being destroyed in js
    const searchBox = document.createElement('div')
    searchBox.setAttribute('class', 'search-box')
    const searchInputElement = document.createElement('input')
    searchInputElement.setAttribute('type', 'text')
    searchInputElement.setAttribute('role', 'search')
    searchInputElement.setAttribute('class', 'input')
    searchInputElement.setAttribute('id', 'main-input')
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
    const mainInput = document.getElementById('main-input')
    mainInput.focus()
}

const renderFooter =()=>{
    const footerWrapper = document.createElement('div')
    footerWrapper.setAttribute('id', 'footer-wrapper')
    const footerTextElement = document.createElement('p')
    footerTextElement.setAttribute('id', 'footer-text-element')
    footerTextElement.innerHTML = '&#169;&#9760; 2021 Thomas Godwin&#9760;&#9996;'
    footerWrapper.appendChild(footerTextElement)
    document.body.appendChild(footerWrapper)    
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

/////////////////////may not need these 2 functions/////////
/////////////////////may not need these 2 functions/////////
/////////////////////may not need these 2 functions/////////
// const generateStoreOpeningHoursDOM=(openingHoursText)=>{
//     let openingHoursElement = document.createElement('div')
//     openingHoursElement.setAttribute('id', 'opening-hours-element')
//     openingHoursElement.textContent = openingHoursText
//     return openingHoursElement
// }

// const renderStoreOpeningHours =(openingHoursElement)=> {
//     removeDomElements('opening-hours-element')
//     let storeInfoContentHolder = document.getElementById('store-info-content-holder')
//     storeInfoContentHolder.appendChild(openingHoursElement)
//         renderSearchAgainButton()
// }

/////////////////////may not need these 2 functions/////////
/////////////////////may not need these 2 functions/////////
/////////////////////may not need these 2 functions/////////

const makeCurrentlyDisplayedStorePersisent = (store)=>{
    let temporaryStorage = window.sessionStorage
    temporaryStorage.setItem('currentlySelectedStore', JSON.stringify(store))   
}
const renderAriaCountdownElement =(openingHoursText)=>{
    if (openingHoursText) {
        let pageMainElement = document.getElementById('page-main-element')
        let ariaCountDownElement = document.createElement('span')    
        ariaCountDownElement.setAttribute('id', 'sr-only-closing-countdown')
        ariaCountDownElement.textContent = openingHoursText
        pageMainElement.appendChild(ariaCountDownElement) 
        return
    }

    const convertedNumericToday = getTodayNumericConvertedToVinmonpolet()
    let temporaryStorage = window.sessionStorage
    const currentlySelectedStore = JSON.parse(temporaryStorage.getItem('currentlySelectedStore'))
    const closesTodayAt = currentlySelectedStore[0].openingHours.regularHours[convertedNumericToday].closingTime
    const closingTimeConverted = convertTimeStringToProperDate(closesTodayAt)
    let now = new Date().getTime()
    let timeLeft = closingTimeConverted - now
    let timeUntilClosing = {}
    timeUntilClosing.hours = Math.floor( (timeLeft/(1000*60*60)) % 24 )
    timeUntilClosing.minutes = Math.floor( (timeLeft/1000/60) % 60 )

    let ariaCountDownElement = document.createElement('span')    
    ariaCountDownElement.setAttribute('id', 'sr-only-closing-countdown')
    ariaCountDownElement.textContent = 'store closes in:'

    let pageMainElement = document.getElementById('page-main-element')
    const storeClosesInText = createCountdownText(timeUntilClosing)
    ariaCountDownElement.textContent = storeClosesInText
    pageMainElement.appendChild(ariaCountDownElement) 
}

const renderStoreAddress = (store) => {
    let storeId = store[0].storeId   
    const homeStoreId = preferredStore.getHomeStore()
    if (homeStoreId === storeId) {
        setDisplayingHomeStore(true)
    }

    let homeStoreButton = document.getElementById('home-store-button')
    if (!homeStoreButton) {
        renderHomeStoreButton()
    }

    displayingIndividualStore = true
    makeCurrentlyDisplayedStorePersisent(store)

    let temporaryStorage = window.sessionStorage
    let storeInfoArray = JSON.parse(temporaryStorage.getItem('currentlySelectedStore'))
    let storeInfo = storeInfoArray[0]

    removeDomElements('search-form')
    removeDomElements('main-search-form')
    removeDomElements('list-of-store-choices')

    let storeAddressHolder = document.createElement('div')
    storeAddressHolder.setAttribute('id', 'store-address-holder')

    const storeElement = generateStoreDOM(storeInfo)
    const pageMainElement = document.getElementById('page-main-element')
    storeAddressHolder.appendChild(storeElement)
    pageMainElement.appendChild(storeAddressHolder)
    
    const holidays = storeInfo.openingHours.exceptionHours
    setSelectedStoreHolidays(holidays)

    if (filteredHoliday !== null ) {           
        const holidayHoursElement = generateStorehoursHolidayDOM()
        storeAddressHolder.appendChild(holidayHoursElement) 
        renderSearchAgainButton()
    } else {
        ///need this?
        // const storeStatus = generateStoreOpenStatus(store)
        ///need this ?
    }

    renderCountdownWrapper()

    renderSearchAgainButton()
    decideCountdownElementContents(store)
    // renderAriaCountdownElement()
}


const generateStoreOpeningHoursText = (storeStatus, store) => {
    let openingHoursText
    const selectedStore = store[0]
    const todayIntegerConverted = getTodayNumericConvertedToVinmonpolet()
    const closesTodayAt = selectedStore.openingHours.regularHours[todayIntegerConverted].closingTime    
    const opensTodayAt = selectedStore.openingHours.regularHours[todayIntegerConverted].openingTime

    if (selectedStore.storeId === '801'){
        return openingHoursText = 'The E lager is not open to the public'            
    }
    if (storeStatus.closedAllDay === true){
        return openingHoursText = 'The store is closed all day today.'
    }
    if(storeStatus.hasClosed === true) { 
        console.log('selectedStore: ', selectedStore);
        let openingHoursText = `This store has already closed today at ${closesTodayAt}. `
        const todayNumericVinmonopolet = getTodayNumericConvertedToVinmonpolet()
        let thisDayHasBeenChecked = true
        const nextOpenText = findNextOpenDay(selectedStore, todayNumericVinmonopolet, thisDayHasBeenChecked)
        openingHoursText += nextOpenText
        return openingHoursText
    }
    if(storeStatus.hasOpened === false) {
        let openingHoursText = `This store will open today at ${opensTodayAt} and closes at ${closesTodayAt}.`      
        return openingHoursText
    }
}

const renderNotCurrentlyOpenText = (openingHoursText) => {

    let countdownWrapper = document.getElementById('countdown-wrapper')
    let notOpenTextWrapper = document.createElement('div')
    notOpenTextWrapper.setAttribute('id', 'not-open-text-wrapper')    
    let notOpenText = document.createElement('p')
    notOpenText.innerHTML += openingHoursText
    notOpenTextWrapper.appendChild(notOpenText)
    countdownWrapper.appendChild(notOpenTextWrapper)
}

const decideCountdownElementContents = (store) =>{
    const storeStatus = generateStoreOpenStatus(store)
    const openingHoursText = generateStoreOpeningHoursText(storeStatus, store)

    if (storeStatus.closedAllDay === true || storeStatus.hasOpened === false || storeStatus.hasClosed === true) {
        
        renderNotCurrentlyOpenText(openingHoursText)
        renderAriaCountdownElement(openingHoursText)
    }
    if (storeStatus.isOpen === true) {
        startCountdownTimer()
        renderAriaCountdownElement()
    }
}

const renderCounter =()=>{
    /////////test///////////
    /////////test///////////
    const iconWrapper = document.createElement('div')
    iconWrapper.setAttribute('id', 'icon-wrapper')
    /////////test///////////
    /////////test///////////
    const hourWrapper = document.createElement('div')
    hourWrapper.setAttribute('id', 'hour-wrapper')
    const minuteWrapper = document.createElement('div')
    minuteWrapper.setAttribute('id', 'minute-wrapper')
    const secondWrapper = document.createElement('div')
    secondWrapper.setAttribute('id', 'second-wrapper')
    const hoursText = document.createElement('div')
    hoursText.setAttribute('id', 'hours-remaining')
    const minutesText = document.createElement('div')
    minutesText.setAttribute('id', 'minutes-remaining')
    const secondsText = document.createElement('div')
    secondsText.setAttribute('id', 'seconds-remaining')

    const hoursLabel = document.createElement('div')
    hoursLabel.setAttribute('id', 'hours-label')
    const minutesLabel = document.createElement('div')
    minutesLabel.setAttribute('id', 'minutes-label')
    const secondsLabel = document.createElement('div')
    secondsLabel.setAttribute('id', 'seconds-label')
  
    hourWrapper.appendChild(hoursText)
    hourWrapper.appendChild(hoursLabel)
    minuteWrapper.appendChild(minutesText)
    minuteWrapper.appendChild(minutesLabel)
    secondWrapper.appendChild(secondsText)
    secondWrapper.appendChild(secondsLabel)

    let countdownWrapper = document.getElementById('countdown-wrapper')

    ////////test/////////
    countdownWrapper.appendChild(iconWrapper)
    ////////test/////////
    countdownWrapper.appendChild(hourWrapper)
    countdownWrapper.appendChild(minuteWrapper)
    countdownWrapper.appendChild(secondWrapper)
}

let countdownTimer 
function startCountdownTimer() {
    let countdownWrapper = document.getElementById('countdown-wrapper')
    if (countdownWrapper.firstChild){
        while(countdownWrapper.firstChild !== null) {
            countdownWrapper.removeChild(countdownWrapper.firstChild)
            }
    }

    renderCounter()

    const convertedNumericToday = getTodayNumericConvertedToVinmonpolet()
    let temporaryStorage = window.sessionStorage
    const currentlySelectedStore = JSON.parse(temporaryStorage.getItem('currentlySelectedStore'))

    const closesTodayAt = currentlySelectedStore[0].openingHours.regularHours[convertedNumericToday].closingTime
    const closingTimeConverted = convertTimeStringToProperDate(closesTodayAt)
    let now = new Date().getTime()
    let timeLeft = closingTimeConverted - now
    let timeUntilClosing = {}
    timeUntilClosing.hours = Math.floor( (timeLeft/(1000*60*60)) % 24 )
    timeUntilClosing.minutes = Math.floor( (timeLeft/1000/60) % 60 )
    timeUntilClosing.seconds = Math.floor( (timeLeft/1000) % 60 )
    renderTimeLeft(timeUntilClosing)
    countdownTimer = setTimeout(startCountdownTimer, 1000)
    ////temp//////
    clearTimeout(countdownTimer)
    ////temp//////
}



const renderCountdownWrapper=()=>{
    const countdownWrapper = document.createElement('div')
    countdownWrapper.setAttribute('id', 'countdown-wrapper')
    countdownWrapper.setAttribute('aria-hidden', true)

    pageMainElement.appendChild(countdownWrapper) 
}

const createCountdownText =(timeRemaining)=>{
    const hoursRemaining = timeRemaining.hours
    const minutesRemaining = timeRemaining.minutes
    const hoursText = (hoursRemaining !== 1) ? 'hours' : 'hour' //note it should be 0 hours not 0 hour & 1hour same applies below
    const minutesText = (minutesRemaining !== 1) ? 'minutes' : 'minute' 

    if(hoursRemaining === 0 && minutesRemaining !== 0){
        return `The store closes in ${minutesRemaining} ${minutesText}`
    } else {
        return `The store closes in ${hoursRemaining} ${hoursText} ${minutesRemaining} ${minutesText}`
    }
}

const renderTimeLeft =(timeUntilClosing)=>{
    const hoursRemaining = timeUntilClosing.hours
    const minutesRemaining = timeUntilClosing.minutes
    const secondsRemaining = timeUntilClosing.seconds

    
    //////////test///////
    //////////test//////
    const iconWrapper = document.getElementById('icon-wrapper')
    let openClosedIcon = document.createElement('icon')
    let openClosedText = document.createElement('span')
    openClosedText.setAttribute('id', 'open-closed-label')
    openClosedIcon.setAttribute('class', 'fas fa-check-circle')
    openClosedText.textContent = 'Open for:'
    iconWrapper.appendChild(openClosedIcon)
    iconWrapper.appendChild(openClosedText)
    // <i class="fas fa-times-circle"></i>
    //////////test///////
    //////////test///////
    
    const hoursText = document.getElementById('hours-remaining')    
    const minutesText = document.getElementById('minutes-remaining')
    const secondsText = document.getElementById('seconds-remaining')

    hoursText.textContent = hoursRemaining
    minutesText.textContent = minutesRemaining
    secondsText.textContent = secondsRemaining

    const hoursLabel = document.getElementById('hours-label')    
    const minutesLabel = document.getElementById('minutes-label')
    const secondsLabel = document.getElementById('seconds-label')

    const hoursLabelText = (hoursRemaining !== 1) ? 'Hours' : 'Hour' //note it should be 0 hours not 0 hour & 1hour same applies below
    const minutesLabelText = (minutesRemaining !== 1) ? 'Minutes' : 'Minute'
    const secondsLabelText = (secondsRemaining !== 1) ? 'Seconds' : 'Second'

    hoursLabel.textContent = hoursLabelText
    minutesLabel.textContent = minutesLabelText
    secondsLabel.textContent = secondsLabelText

}

const findNextOpenDay = (store, todayNumericVinmonopolet, thisDayHasBeenChecked)=> {
    console.log('todayNumericVinmonopolet: ', todayNumericVinmonopolet);
    console.log('stozzzzzre: ', store[0]);
    //NOTE THIS IS ONLY USED AFTER THE STORE HAS CLOSED FOR TODAY, and that stores are not open on Sundays
    //That is why the 5(saturday) is used below to check monday
    //Note JS uses 0 to represent sunday, vinmonpolet uses 0 to represent monday 

    //  const openingTimes = store[0].openingHours.regularHours ///changed this i think    
     const openingTimes = store.openingHours.regularHours     
     console.log('openingTimes: ', openingTimes);

     ///////////////////////you are here//////////////////////
     ///////////////////////you are here//////////////////////
     ///////////////////////error in displaying find next open day//////////////////////
     ///////////////////////may just be because it is sunday todY?//////////////////////
     ///////////////////////you are here//////////////////////
     ///////////////////////you are here//////////////////////

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
         const nextTimeOpenText = generateNextOpenInfo(nextOpeningTime, nextOpeningWeekday)
        return nextTimeOpenText
     }   
}

const generateNextOpenInfo =(nextOpeningTime, nextOpeningWeekday) =>{
    let nextTimeOpenText = `It opens again at ${nextOpeningTime} on ${nextOpeningWeekday}.`
    return nextTimeOpenText  
}

const renderSearchAgainButton =()=>{

    let searchAgainButton = document.createElement('button')
    searchAgainButton.textContent = 'Check Another Store'
    searchAgainButton.setAttribute('id', 'search-again-button')

    
    searchAgainButton.addEventListener("click", (e) => {
        const temporaryStorage = window.sessionStorage
        temporaryStorage.clear()
        displayingIndividualStore = false
        setDisplayingHomeStore(false)
        clearTimeout(countdownTimer)
        removeDomElements('home-store-button')
        removeDomElements('countdown-wrapper')
        removeDomElements('store-address-holder') 
        removeDomElements('search-again-button')        
        removeDomElements('sr-only-closing-countdown')

        renderSearchElement() 
   
    })
    const storeInfoContentHolder = document.getElementById('store-info-content-holder')
    pageMainElement.appendChild(searchAgainButton)
}

const generateSelectStoreDOMWithSearchTerm = (store, currentListOfStores) => {
    const storeElement = document.createElement('span')
    const storeTextElement = document.createElement('button')
    storeTextElement.textContent =  `${store.storeName}`  
    storeTextElement.setAttribute('id', store.storeId) 
    storeTextElement.textContent += ` Contains: ${store.searchedFor}`   
    storeTextElement.classList.add('clickable')
    storeElement.appendChild(storeTextElement)

    const storeWasSelected = (event)=>{
        event.preventDefault()    
        selectThisStore(event.target.id, currentListOfStores) 
        removeDomElements('main-search-form')
        removeDomElements('list-of-store-choices')
        removeDomElements('sr-only-closing-countdown')
    }  

   
    storeTextElement.addEventListener('click', storeWasSelected)

    return storeElement
}

const generateSelectStoreDOM = (store, currentListOfStores) => {

    const storeElement = document.createElement('span')
    const storeTextElement = document.createElement('button') 
    storeTextElement.textContent = store.storeName   
    storeTextElement.setAttribute('id', store.storeId)    
    storeTextElement.classList.add('clickable')
    storeElement.appendChild(storeTextElement)

    const storeWasSelected = (event)=>{
        event.preventDefault()    
        selectThisStore(event.target.id, currentListOfStores) 
        removeDomElements('main-search-form')
        removeDomElements('list-of-store-choices')
        removeDomElements('sr-only-closing-countdown')
    }  
   
    storeTextElement.addEventListener('click', storeWasSelected)

    return storeElement
}

const selectThisStore =(id, stores)=> {
    let filteredStore = stores.filter(store => store.storeId === id)
      
    renderStoreAddress(filteredStore)    
}

const checkforInvalidStore =(toBeChecked)=> {
    let store = toBeChecked
    if (store.storeId === '122' ) {//temporary while store is remodeling/building
        return true
    }
    if (store.storeId === '801') {
        return true
    }
}

const filterOutInvalidStoresFromList =()=>{

}


const renderStores = (stores, moreResultsToDisplay, currentListOfStores) => { 
    
    displayingIndividualStore = false
    let showMoreResultsButtonExists = document.getElementById('show-more-results')
    if (showMoreResultsButtonExists !== null) {
        showMoreResultsButtonExists.remove()
    }

    let listOfStoreChoicesExists = !!document.getElementById('list-of-store-choices')

    if (listOfStoreChoicesExists) {
         let listOfStoreChoices = document.getElementById('list-of-store-choices')
    } else {
        let listOfStoreChoices = document.createElement('div')
        listOfStoreChoices.setAttribute('id', 'list-of-store-choices')
        let pageMainElement = document.getElementById('page-main-element')
        pageMainElement.appendChild(listOfStoreChoices)
    }

    let addSearchedFor = getSearchTermIsMultiple()

    if (addSearchedFor) {
            stores.forEach((store) => {
                const notValidStore = checkforInvalidStore(store)
                console.log('notValidStore: ', notValidStore);
                if (notValidStore) {
                    return
                }
                let listOfStoreChoices = document.getElementById('list-of-store-choices')
                let storeElement = generateSelectStoreDOMWithSearchTerm(store, currentListOfStores)
                listOfStoreChoices.appendChild(storeElement)
        })
        } else {
            stores.forEach((store) => {
                const notValidStore = checkforInvalidStore(store)
                console.log('notValidStore: ', notValidStore);
                if (notValidStore) {
                    return
                }
                let listOfStoreChoices = document.getElementById('list-of-store-choices')
                let storeElement = generateSelectStoreDOM(store, currentListOfStores)
                listOfStoreChoices.appendChild(storeElement)
        })
    } 


    if (moreResultsToDisplay) {
        let listOfStoreChoices = document.getElementById('list-of-store-choices')
        let showMoreResultsButton = document.createElement('button')
        showMoreResultsButton.setAttribute('id', 'show-more-results')
        showMoreResultsButton.textContent = 'Show more results'
        listOfStoreChoices.appendChild(showMoreResultsButton) 
        showMoreResultsButton.addEventListener('click', (e)=> {
            e.preventDefault()
            getNext10OrFewerResults(currentListOfStores)
        } )
    }
}
  
const renderNoStoresFound =()=> { 
    let storeInfoContentHolder = document.createElement('div')
    storeInfoContentHolder.setAttribute('id', 'no-stores-found')  
    const searchAgainTextElement = document.createElement('h1')    
    searchAgainTextElement.textContent = 'No stores Found. Search Again'
    storeInfoContentHolder.appendChild(searchAgainTextElement)
    pageMainElement.appendChild(storeInfoContentHolder) 
}

const removeDomElements = (elementToDestroy) => {
    
    let toDestroy = document.getElementById(elementToDestroy)

    if (toDestroy) {
        if (toDestroy.firstChild){
            while(toDestroy.firstChild !== null) {
                toDestroy.removeChild(toDestroy.firstChild)
                    }
                    toDestroy.parentElement.removeChild(toDestroy)
        }
    } 
}

export { renderHomeStoreButton, renderScriptTag, renderPageMainElement, checkforInvalidStore, filterOutInvalidStoresFromList,  renderStores, renderStoreAddress, renderFooter, renderNoStoresFound, renderHeader, renderClockDom, renderSearchElement, renderTimeAndDate, removeDomElements }
