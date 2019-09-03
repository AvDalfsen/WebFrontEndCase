function orderButtonClicked(event) {
    let nameOfPark = event.target.parentNode.parentNode.getElementsByClassName("parkname")[0].innerText
    let noOfAdults = parseInt(event.target.parentNode.getElementsByClassName("numberofadults")[0].value)
    let noOfChildren = parseInt(event.target.parentNode.getElementsByClassName("numberofkids")[0].value)
    saveOrderInShoppingBasket(nameOfPark, noOfAdults, noOfChildren)
}

setNumberOfOrders()

function saveOrderInShoppingBasket(nameOfPark, noOfAdults, noOfChildren) {
    let orderDataJSON = JSON.stringify({ nameOfPark, noOfAdults, noOfChildren })
    let counter = countOrders()
    localStorage.setItem("order"+counter, orderDataJSON)

    console.log(localStorage.getItem("order1"))
    setNumberOfOrders()
    
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


let buttons = document.querySelectorAll("button.orderbutton")
buttons.forEach(function (item) { item.addEventListener("click", orderButtonClicked) })