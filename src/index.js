const defaultBreak = "5"
const defaultSession = "25"

let time = `${defaultSession}:00`
let isRunning = false
let isSession = true
let justStarted = true

const breakLengthEl = document.querySelector('#break-length')
const sessionLengthEl = document.querySelector('#session-length')
const timeEl = document.querySelector('#time-left')
const timerLabelEl = document.querySelector("#timer-label")
const startStopEl = document.querySelector("#start_stop")
const resetEl = document.querySelector("#reset")


const resetClock = () => {
    breakLengthEl.textContent = defaultBreak
    sessionLengthEl.textContent = defaultSession
    time = timeEl.textContent = `${defaultSession}:00`
    timerLabelEl.textContent = "Session"
    startStopEl.innerHTML = `<i class="fa-solid fa-play"></i>`
    resetEl.innerHTML = `<i class="fa-solid fa-arrows-rotate"></i>`

    isRunning = false
    isSession = true
    justStarted = true
}

const incrementBreak = () => {
    const n = parseInt(breakLengthEl.textContent)

    if(n === 60)
        return

    breakLengthEl.textContent = n + 1
}

const decrementBreak = () => {
    const n = parseInt(breakLengthEl.textContent)
    
    if(n === 1)
        return

    breakLengthEl.textContent = n - 1
}

const incrementSession = () => {
    const n = parseInt(sessionLengthEl.textContent) 
    
    if(n === 60)
        return
    
    sessionLengthEl.textContent = n + 1
}

const decrementSession = () => {
    const n = parseInt(sessionLengthEl.textContent) 
    
    if(n === 1)
        return
    
    sessionLengthEl.textContent = n - 1
}

const startStop = () => {
    if(isRunning) {
        isRunning = false
        startStopEl.innerHTML = `<i class="fa-solid fa-play"></i>`
    }
    else {
        isRunning = true
        startStopEl.innerHTML = `<i class="fa-solid fa-pause"></i>`
    }

}

const updateTime = () => {
    if(isSession)
        timerLabelEl.textContent = "Session"
    else
        timerLabelEl.textContent = "Break"

    if(!isRunning)
        return

    if(justStarted) {
        justStarted = false

        if(parseInt(sessionLengthEl.textContent) < 10)
            time = `0${sessionLengthEl.textContent}:00`
        else
            time = `${sessionLengthEl.textContent}:00`
    }
    
    let min = parseInt(time.substring(0, 2))
    let sec = parseInt(time.substring(3, 5))
    
    if(sec !== 0)
        sec -= 1
    else if(min !== 0){
        sec = 59
        min -= 1
    }
    else
        min = sec = 0

    if(min < 10)
        min = `0${min}`
    if(sec < 10)
        sec = `0${sec}`
    
    time = `${min}:${sec}`
    
    timeEl.textContent = time
    
    if(parseInt(min) === 0 && parseInt(sec) === 0) {
        if(isSession) {
            isSession = false
            if(parseInt(breakLengthEl.textContent) < 10)
                time = `0${breakLengthEl.textContent}:00`
            else
                time = `${breakLengthEl.textContent}:00`
        }
        else {
            isSession = true

            if(parseInt(sessionLengthEl.textContent) < 10)
                time = `0${sessionLengthEl.textContent}:00`
            else
                time = `${sessionLengthEl.textContent}:00`

        }
    }
}

resetClock()
setInterval(updateTime, 1000)