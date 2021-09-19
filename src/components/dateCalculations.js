import { setStoreOpenStatus } from '../index'
let selectedStoreHolidays = {}
let filteredHoliday = null

const now = new Date()

const nowYear = now.getFullYear(now)
const nowMonth = now.getMonth(now)
const nowDate = now.getDate(now)
const nowMonthText = now.toLocaleString("default", { month: "long" })
const nowWeekday = now.toLocaleString("default", { weekday: "short" })

const todayDateForHolidayCheck = `${nowYear}.${nowMonth + 1}.${nowDate}`
const todayDateForDisplay = `${nowWeekday}, ${nowMonthText} ${nowDate}`

const formatCurrentTime =()=>{
    let nowTime = new Date()
    let nowHour = nowTime.getHours(nowTime)
    let nowMinutes = nowTime.getMinutes(nowTime)
    let nowSeconds = nowTime.getSeconds(nowTime)
    if (nowSeconds < 10) {
        nowSeconds = `0${nowSeconds}`
    } 
    if (nowMinutes < 10) {
        nowMinutes = `0${nowMinutes}`
    } 
    return `${nowHour}:${nowMinutes}:${nowSeconds}`
}

const formattedCurrentTime = formatCurrentTime()

const setSelectedStoreHolidays = (holidayDates) => {
    selectedStoreHolidays = holidayDates
    isTodayHoliday(selectedStoreHolidays)    
}

const isTodayHoliday = (selectedStoreHolidays) => {    
    const todayAsArray = todayDateForHolidayCheck.split('.')
    const convertedToday = `${todayAsArray[0]}-${todayAsArray[1]}-${todayAsArray[2]}`

    function isTodayHoliday (selectedStoreHolidays) {    
        return selectedStoreHolidays.date === convertedToday
    }

    filteredHoliday = selectedStoreHolidays.filter(isTodayHoliday)
    if (filteredHoliday.length === 0) {
        filteredHoliday = null
    } 
}

const getTodayNumeric = ()=>new Date().getDay() //0 sunday, 1 monday, 2 tuesday... - 6 saturday

const getTodayNumericConvertedToVinmonpolet =()=>{
    //Note JS uses 0 to represent sunday, vinmonpolet uses 0 to represent monday
    //the code below is just adjusting that
    const today = getTodayNumeric()
    if (today === 0) {
        return 6
    } else {
        return today - 1
    }
}

 const generateStoreOpenStatus = (store)=>{
    let now2 = '' 
    now2 = Date.now()

    let status = {}   

    if (store[0].status !== 'Open') { //Note that this is status in the store info from the API, not the status being set
        
        status.closedAllDay = true
        status.isOpen = false
    }

    let todayNumericConvertedToVinmonopolet = getTodayNumericConvertedToVinmonpolet()

    let storeHours = store[0].openingHours.regularHours

    if (storeHours[todayNumericConvertedToVinmonopolet].closed === true) {
        status.closedAllDay = true        
    } else {
        status.closedAllDay = false        
    }    

    let openingTime = storeHours[todayNumericConvertedToVinmonopolet].openingTime
    let closingTime = storeHours[todayNumericConvertedToVinmonopolet].closingTime

    const convertedOpeningTime = convertTimeStringToProperDate(openingTime)
    const convertedClosingTime = convertTimeStringToProperDate(closingTime)

    if (now2 >= convertedOpeningTime) {
        status.hasOpened = true
    }  else {
        status.hasOpened = false
    }
 
    if (now2 < convertedClosingTime) {   
        status.hasClosed = false        
    } else {
        status.hasClosed = true
    }

    if (status.hasOpened && !status.hasClosed) {
        status.isOpen = true
    } else {
        status.isOpen = false
    }

    if (status.isOpen) {
        setStoreOpenStatus(true)
    } else {
        setStoreOpenStatus(false)
    }

    return status    
}

const convertTimeStringToProperDate =(timeString)=> {
    //used to take the string opening/closing times ie('12:35') and put them into a js date object, so the countdown timer has proper js dates
    let timeToArray = timeString.split(':')

    let hour = timeToArray[0]
    let minute = timeToArray[1]

    const convertedTime = new Date(now.valueOf()) 

    convertedTime.setHours(hour)
    convertedTime.setMinutes(minute)
    convertedTime.setSeconds(0)

    return convertedTime    
}



export { setSelectedStoreHolidays, isTodayHoliday, filteredHoliday, formattedCurrentTime, todayDateForDisplay, generateStoreOpenStatus, convertTimeStringToProperDate, formatCurrentTime, getTodayNumericConvertedToVinmonpolet }