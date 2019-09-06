let listOfOrders = []
let counter = 0
let totalCost = 0

while(localStorage.getItem("order"+counter)){
    listOfOrders.push(JSON.parse(localStorage.getItem("order"+counter)))
    counter = counter + 1;
    document.getElementsByClassName("badge")[0].innerHTML = counter
}

for(let i = 0; i<listOfOrders.length; i++){
    let template = document.querySelector("#ticket")
    let templateClone = document.importNode(template.content, true)
    let article = templateClone.querySelector("article")
    let keys = ["nameOfPark", "noOfAdults", "noOfChildren", "orderCost"]
    for(let j = 0; j < keys.length; j++){
        article.children[j].innerHTML += listOfOrders[i][keys[j]]
    }
    totalCost += listOfOrders[i]["orderCost"]
    document.getElementById("templateClones").append(article)
}

console.log(document.getElementById("totalcost").innerHTML = totalCost)

let paymentButton = document.querySelector("#finalizepaymentbutton")
paymentButton.addEventListener("click", paymentButtonClicked)

function paymentButtonClicked() {
    if(listOfOrders.length != 0){
        localStorage.clear()
        window.location.href = "orderplaced.html"
        postOrder(collectOrders())
        listOfOrders = []
    }
}

function collectOrders() {
    var collectedOrders = {}
    for (let i = 0; i < listOfOrders.length; i++){
        collectedOrders['order'+i] = listOfOrders[i]
    }
    return collectedOrders
}

async function postOrder() {
    var orders = {};
    for(let i = 0; i<listOfOrders.length; i++){
        orders["order"+i] = listOfOrders[i]
    }
    await fetch("api/placeorder",
    {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        method: "POST",
        body: JSON.stringify(orders)
    });
}