let data = []
let availableTicketsPerPark = []

function orderButtonClicked(event) {
    let nameOfPark = event.target.parentNode.parentNode.getElementsByClassName("parkname")[0].innerText
    let noOfAdults = parseInt(event.target.parentNode.getElementsByClassName("numberofadults")[0].value)
    let noOfChildren = parseInt(event.target.parentNode.getElementsByClassName("numberofkids")[0].value)
    if(!noOfAdults > 0 || noOfAdults < 0) noOfAdults = 0
    if(!noOfChildren > 0 || noOfChildren < 0) noOfChildren = 0
    if(noOfAdults != 0 || noOfChildren != 0) saveOrderInShoppingBasket(nameOfPark, noOfAdults, noOfChildren)
}

function saveOrderInShoppingBasket(nameOfPark, noOfAdults, noOfChildren) {
    let orderDataJSON = JSON.stringify({nameOfPark, noOfAdults, noOfChildren})
    let counter = countOrders()
    if (checkTicketAvailability(noOfAdults, noOfChildren) == true){
        event.target.parentNode.parentNode.children[2].innerHTML -= (noOfAdults + noOfChildren)
        localStorage.setItem("order"+counter, orderDataJSON)
        setNumberOfOrders()
    }
    else {alert("Our apologies, but there aren't that many tickets available.")
    }
}

function countOrders(){
    let counter = 0

    while(localStorage.getItem("order"+counter)){
        counter = counter + 1
    }
    return counter
}

function setNumberOfOrders() {
    let counter = countOrders()
    document.getElementsByClassName("badge")[0].innerHTML = counter;
}

async function fetchAsync () {
    data = await (await fetch('api/attractions')).json()
    }

async function buildAttractions() {
    await fetchAsync()
    getNoOfAvailableTickets()
    for (let i = 0; i < data.length; i++) {
        let template = document.querySelector("#attractionTemplate")
        let templateClone = document.importNode(template.content, true)
        article = templateClone.querySelector("article");
        buildHTML(data[i], article, i)
        document.getElementById("templateClones").append(article)
    }
    let buttons = document.querySelectorAll("button.orderbutton")
    buttons.forEach(function (item) { item.addEventListener("click", orderButtonClicked) })
}

function buildHTML(data, article, i) {
    let keys = ["name", "description", "available", "adultPrice", "kidsPrice", "minimumNumberOfAdults", "minimumNumberOfKids", "discount"];
    article.children[0].innerHTML += data[keys[0]]
    article.children[1].innerHTML += data[keys[1]]
    article.children[2].innerHTML += data[keys[2]]
    article.children[3].children[0].children[0].innerHTML += data[keys[3]]
    article.children[3].children[0].children[1].innerHTML += data[keys[4]]
    article.children[3].children[0].children[2].children[1].innerHTML += data[keys[5]]
    article.children[3].children[0].children[2].children[2].innerHTML += data[keys[6]]
    article.children[3].children[0].children[2].children[3].innerHTML += data[keys[7]]
}

function getNoOfAvailableTickets(){
    for (let i = 0; i < data.length; i++){
        let name = data[i].name
        let available = data[i].available
        availableTicketsPerPark.push([name,available])
    }
}

function checkTicketAvailability(noOfAdults, noOfChildren) {
    return parseInt(event.target.parentNode.parentNode.children[2].innerHTML) >= (noOfAdults+noOfChildren)
}

function getTotal()
{
    var totalPrice = 0
    if(checkDiscount() == true) totalPrice = ((getAdultPrice() + getChildPrice()) * getDiscount())
    else totalPrice = getAdultPrice() + getChildPrice()
    event.target.parentNode.children[5].children[1].innerHTML = totalPrice + ",-";
}

function getAdultPrice() {
    let adultPrice = parseInt(event.target.parentNode.children[0].children[0].childNodes[3].nodeValue)
    let noOfAdults = parseInt(event.target.parentNode.getElementsByClassName("numberofadults")[0].value)
    if(!noOfAdults > 0) noOfAdults = 0
    return adultPrice * noOfAdults
}

function getChildPrice() {
    let childPrice = parseInt(event.target.parentNode.children[0].children[1].childNodes[3].nodeValue)
    let noOfChildren = parseInt(event.target.parentNode.getElementsByClassName("numberofkids")[0].value)
    if(!noOfChildren > 0) noOfChildren = 0
    return childPrice * noOfChildren
}

function getDiscount() {
    let discount = parseInt(event.target.parentNode.children[0].children[2].children[3].childNodes[0].nodeValue)
    return ((100 - discount) / 100)
}

function checkDiscount() {
    let noOfAdults = parseInt(event.target.parentNode.getElementsByClassName("numberofadults")[0].value)
    let noOfChildren = parseInt(event.target.parentNode.getElementsByClassName("numberofkids")[0].value)
    if(!noOfAdults > 0) noOfAdults = 0
    if(!noOfChildren > 0) noOfChildren = 0
    let minNoOfAdults = parseInt(event.target.parentNode.children[0].children[2].children[1].innerHTML) 
    let minNoOfChildren = parseInt(event.target.parentNode.children[0].children[2].children[2].innerHTML)
    console.log(noOfAdults, minNoOfAdults, noOfChildren, minNoOfChildren)
    if(noOfAdults == minNoOfAdults && noOfChildren == minNoOfChildren) return true
    return false
}

fetchAsync()
setNumberOfOrders()
buildAttractions()