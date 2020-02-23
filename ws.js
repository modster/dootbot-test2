/*
 * Basic client side iterator
 * Builds html page
 * Handles events
 */

let baseUrl = "wss://stream.binance.com:9443/ws/"
let symbolUrl = "btcusdt"
let queryUrl = "@miniTicker"
let fullUrl = baseUrl + symbolUrl + queryUrl
let message
let builtPage = false

var ws = new WebSocket(fullUrl)

ws.onopen = function(event) {
    // console.log(event)
    console.log('connected: ' + fullUrl)
    var label = document.getElementById("status")
    label.innerHTML = "Connection established: " + fullUrl
}

const handler = function(event) {
    const eventObj = JSON.parse(event.data) 
    const myArr = (Object.keys(eventObj))
    if(builtPage === false) {
        myArr.forEach((item) => {
            // console.log(item, eventObj[item])
            let g = document.createElement("div")
            g.setAttribute("id", item)
            document.body.appendChild(g)
            builtPage = "true"
        })
    }
    myArr.forEach((item) => {
        if(item === "E"){
            var unix_timestamp = eventObj[item]
            var date = new Date(unix_timestamp)
            var hours = date.getHours()
            var minutes = "0" + date.getMinutes()
            var seconds = "0" + date.getSeconds()
            var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2)
            var clock = document.getElementById("E")
            clock.innerHTML = formattedTime;
        } else {
            let divId = document.getElementById(item)
            divId.innerHTML = eventObj[item]
        }
    })
}
ws.addEventListener('message', handler, false)
