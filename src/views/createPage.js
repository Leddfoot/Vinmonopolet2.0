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
                homeStoreText.textContent = 'Set this store as your home store'
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
        renderStoreOpeningHours(openingHoursElement)        
        return
    }
    if (storeStatus.closedAllDay === true){
        const openingHoursText = 'The store is closed all day Today'
        let openingHoursElement = generateStoreOpeningHoursDOM(openingHoursText)        
        renderStoreOpeningHours(openingHoursElement)
        return
    }
    if(storeStatus.hasClosed === true) { 
        const openingHoursText = `This store has already closed today at ${closesTodayAt}`
        const todayNumericVinmonopolet = getTodayNumericConvertedToVinmonpolet()
        let thisDayHasBeenChecked = true

        let openingHoursElement = generateStoreOpeningHoursDOM(openingHoursText)
        renderStoreOpeningHours(openingHoursElement)
        findNextOpenDay(store, todayNumericVinmonopolet, thisDayHasBeenChecked)
        renderSearchAgainButton()
        return
    }
    if(storeStatus.hasOpened === false) {
        const openingHoursText = `This store will open today at ${opensTodayAt} and closes at ${closesTodayAt}`
        let openingHoursElement = generateStoreOpeningHoursDOM(openingHoursText)
        renderStoreOpeningHours(openingHoursElement)            
        return
    }
    const openingHoursText = `This store is currently open. `
    openingHoursElement = generateStoreOpeningHoursDOM(openingHoursText)
    renderStoreOpeningHours(openingHoursElement, store)
}

const renderStoreOpeningHours =(openingHoursElement)=> {
    removeDomElements('opening-hours-element')
    let storeInfoContentHolder = document.getElementById('store-info-content-holder')
    storeInfoContentHolder.appendChild(openingHoursElement)
        renderSearchAgainButton()
}

const makeCurrentlyDisplayedStorePersisent = (store)=>{
    let temporaryStorage = window.sessionStorage
    temporaryStorage.setItem('currentlySelectedStore', JSON.stringify(store))   
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
        const storeStatus = generateStoreOpenStatus(store)
        // generateStoreOpeningHoursText(storeStatus, store)
        /////////////////you are here//////////////////////////////////////
        /////////////////you are here//////////////////////////////////////
        //is this needed and is this a cause of the triple print glitch
        /////////////////you are here//////////////////////////////////////
        /////////////////you are here//////////////////////////////////////
        console.log('why the fuck is this even here???????: ',);
    }

    renderTimerWrapper()
    renderSearchAgainButton()
    renderAriaCountdownElement()

}

const renderTimerWrapper=()=>{
    const timerWrapper = document.createElement('div')
    timerWrapper.setAttribute('id', 'timer-wrapper')
    timerWrapper.setAttribute('aria-hidden', true)
    const countdownBackground = new Image()
    countdownBackground.src = gloriousLiquor
    timerWrapper.setAttribute('background-image', countdownBackground) 
    const hourWrapper = document.createElement('div')
    hourWrapper.setAttribute('id', 'hour-wrapper')
    const minuteWrapper = document.createElement('div')
    minuteWrapper.setAttribute('id', 'minute-wrapper')
    const secondWrapper = document.createElement('div')
    secondWrapper.setAttribute('id', 'second-wrapper')

    const hoursText = document.createElement('div')
    hoursText.setAttribute('id', 'hours-text')
    const minutesText = document.createElement('div')
    minutesText.setAttribute('id', 'minutes-text')
    const secondsText = document.createElement('div')
    secondsText.setAttribute('id', 'seconds-text')

    const hoursLabel = document.createElement('div')
    hoursLabel.textContent = 'Hours'
    const minutesLabel = document.createElement('div')
    minutesLabel.textContent = 'Minutes'
    const secondsLabel = document.createElement('div')
    secondsLabel.textContent = 'Seconds'

    hourWrapper.appendChild(hoursText)
    hourWrapper.appendChild(hoursLabel)
    minuteWrapper.appendChild(minutesText)
    minuteWrapper.appendChild(minutesLabel)
    secondWrapper.appendChild(secondsText)
    secondWrapper.appendChild(secondsLabel)

    timerWrapper.appendChild(hourWrapper)
    timerWrapper.appendChild(minuteWrapper)
    timerWrapper.appendChild(secondWrapper)

    pageMainElement.appendChild(timerWrapper)
}



const createCountdownText =(timeRemaining)=>{
    const hoursRemaining = timeRemaining.hours
    const minutesRemaining = timeRemaining.minutes
    const hoursText = (hoursRemaining > 1) ? 'hours' : 'hour'
    const minutesText = (minutesRemaining !== 1) ? 'minutes' : 'minute'

    if(hoursRemaining === 0 && minutesRemaining !== 0){
        return `The store closes in ${minutesRemaining} ${minutesText}`
    } else {
        return `The store closes in ${hoursRemaining} ${hoursText} ${minutesRemaining} ${minutesText}`
    }
}

const renderTimeLeft =(timeUntilClosing)=>{
    // console.log('timeUntilClosing: ', timeUntilClosing);
    const hoursRemaining = timeUntilClosing.hours
    const minutesRemaining = timeUntilClosing.minutes
    const secondsRemaining = timeUntilClosing.seconds
    
    const hoursText = document.getElementById('hours-text')    
    const minutesText = document.getElementById('minutes-text')
    const secondsText = document.getElementById('seconds-text')

    hoursText.textContent = hoursRemaining
    minutesText.textContent = minutesRemaining
    secondsText.textContent = secondsRemaining

}


let countdownTimer = setInterval(function() {
    const storeIsOpen = getStoreOpenStatus()
    const convertedNumericToday = getTodayNumericConvertedToVinmonpolet()
    let temporaryStorage = window.sessionStorage
    const currentlySelectedStore = JSON.parse(temporaryStorage.getItem('currentlySelectedStore'))



    //////////temporary testing
      //////////temporary testing
    //   if (displayingIndividualStore === false ) {  
    if (displayingIndividualStore === false || !storeIsOpen) {  


        return
    } else {
        const closesTodayAt = currentlySelectedStore[0].openingHours.regularHours[convertedNumericToday].closingTime
        const closingTimeConverted = convertTimeStringToProperDate(closesTodayAt)
        let now = new Date().getTime()
        let timeLeft = closingTimeConverted - now
        let timeUntilClosing = {}
        timeUntilClosing.hours = Math.floor( (timeLeft/(1000*60*60)) % 24 )
        timeUntilClosing.minutes = Math.floor( (timeLeft/1000/60) % 60 )
        timeUntilClosing.seconds = Math.floor( (timeLeft/1000) % 60 )
        renderTimeLeft(timeUntilClosing)


                    ///////////this needs to be testedbelow///////////////
            ///////////this needs to be tested///////////////
        if (timeLeft < 0) {
            const storeStatus = generateStoreOpenStatus(currentlySelectedStore)
            console.log('storeStatus: ', storeStatus);
            generateStoreOpeningHoursText(storeStatus, currentlySelectedStore)
 
            let timerWrapper = document.getElementById('timer-wrapper')


            if (timerWrapper) {
                if (timerWrapper.firstChild){
                    while(toDestroy.firstChild !== null) {
                        timerWrapper.removeChild(toDestroy.firstChild)
                    }
                }
            } 
            //////////UNFINISHED
            ////////////here you need to add the store is closed text in the timer-wrapper
            ////////////here you need to add the store is closed text in the timer-wrapper
            ////////////here you need to add the store is closed text in the timer-wrapper
            ////////////here you need to add the store is closed text in the timer-wrapper


            clearInterval(countdownTimer)
            console.log('CountDown Finished');
        }
                    ///////////this needs to be testedabove///////////////
            ///////////this needs to be tested///////////////
    }

}, 1000);


const renderAriaCountdownElement =()=>{
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
    ariaCountDownElement.setAttribute('id', 'aria-count-down-element')
    ariaCountDownElement.textContent = 'store closes in:'

    let pageMainElement = document.getElementById('page-main-element')
    const storeClosesInText = createCountdownText(timeUntilClosing)
    ariaCountDownElement.textContent = storeClosesInText
    pageMainElement.appendChild(ariaCountDownElement) 

/////////////////////////
////////////need to add this code to styling
// #aria-count-down-element {
//     position: absolute;
//     height: 1px;
//     width: 1px;
//     clip: rect(1px 1px 1px 1px); // IE 6 and 7
//     clip: rect(1px,1px,1px,1px);
//     clip-path: polygon(0px 0px, 0px 0px, 0px 0px);
//     -webkit-clip-path: polygon(0px 0px, 0px 0px, 0px 0px);
//     overflow: hidden !important;
//     }

/////////////////////////
////////////need to add this code to styling




}


// let ariaCountdownTimer = setInterval(function() {
//     // const storeIsOpen = getStoreOpenStatus()
//     // const convertedNumericToday = getTodayNumericConvertedToVinmonpolet()
//     // let temporaryStorage = window.sessionStorage
//     // const currentlySelectedStore = JSON.parse(temporaryStorage.getItem('currentlySelectedStore'))
      
//     // if (displayingIndividualStore === false || !storeIsOpen) {  
//     //     return
//     // } else {
//         // const closesTodayAt = currentlySelectedStore[0].openingHours.regularHours[convertedNumericToday].closingTime
//         // const closingTimeConverted = convertTimeStringToProperDate(closesTodayAt)
//         // let now = new Date().getTime()
//         // let timeLeft = closingTimeConverted - now
//         // let timeUntilClosing = {}
//         // timeUntilClosing.hours = Math.floor( (timeLeft/(1000*60*60)) % 24 )
//         // timeUntilClosing.minutes = Math.floor( (timeLeft/1000/60) % 60 )
//         // timeUntilClosing.seconds = Math.floor( (timeLeft/1000) % 60 )

//         renderCountdownElement(timeUntilClosing)
//         if (timeLeft < 0) {
//             const storeStatus = generateStoreOpenStatus(currentlySelectedStore)
//             console.log('storeStatus: ', storeStatus);
//             // generateStoreOpeningHoursText(storeStatus, currentlySelectedStore)
 
//             let countDownElement = document.getElementById('count-down-element')
//             let searchAgainButton = document.getElementById('search-again-button')
                    
//             if (countDownElement) {countDownElement.parentElement.removeChild(countDownElement)}           
//             if (searchAgainButton !== null) {searchAgainButton.parentElement.removeChild(searchAgainButton)}

//             clearInterval(countdownTimer)
//             console.log('CountDown Finished');
//         }
        
//     }

// }, 1000);

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
    searchAgainButton.textContent = 'Check Another Store'
    searchAgainButton.setAttribute('id', 'search-again-button')

    
    searchAgainButton.addEventListener("click", (e) => {
        const temporaryStorage = window.sessionStorage
        temporaryStorage.clear()
        displayingIndividualStore = false
        setDisplayingHomeStore(false)
        // destroyHomeStoreButton()
        removeDomElements('home-store-button')
        removeDomElements('timer-wrapper')
        removeDomElements('store-address-holder') 
        removeDomElements('search-again-button')        
        removeDomElements('aria-count-down-element')

        renderSearchElement() 
   
    })
    const storeInfoContentHolder = document.getElementById('store-info-content-holder')
    pageMainElement.appendChild(searchAgainButton)
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
    let filteredStore = stores.filter(store => store.storeId === id)  
    console.log('filteredStore: ', filteredStore);
      
    renderStoreAddress(filteredStore)
    
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
                let listOfStoreChoices = document.getElementById('list-of-store-choices')
                let storeElement = generateSelectStoreDOMWithSearchTerm(store)
                listOfStoreChoices.appendChild(storeElement)
        })
        } else {
            stores.forEach((store) => {
                let listOfStoreChoices = document.getElementById('list-of-store-choices')
                let storeElement = generateSelectStoreDOM(store)
                listOfStoreChoices.appendChild(storeElement)
        })
    } 

    const clickableElements = document.querySelectorAll('.clickable')
  
    clickableElements.forEach((button)=> {
    button.addEventListener("click", (event) => {
        event.preventDefault()
        console.log('ewas clicked: ');
        
        selectThisStore(event.target.id, currentListOfStores) 
        removeDomElements('main-search-form')
        removeDomElements('list-of-store-choices')
        removeDomElements('aria-count-down-element')
        
        
    })
    })

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
    storeInfoContentHolder.setAttribute('id', 'store-info-content-holder')  
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




export { renderHomeStoreButton, renderScriptTag, renderPageMainElement, renderStores, renderStoreAddress, renderFooter, renderNoStoresFound, renderHeader, renderClockDom, renderSearchElement, renderTimeAndDate, removeDomElements }
