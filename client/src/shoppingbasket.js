let listOfOrders = [];
let counter = 0;
while(localStorage.getItem("order"+counter)){
    listOfOrders.push(JSON.parse(localStorage.getItem("order"+counter)));
    counter = counter + 1;
    document.getElementsByClassName("badge")[0].innerHTML = counter;
}

for(let i = 0; i<listOfOrders.length; i++){
    let template = document.querySelector("#ticket");
    let templateClone = document.importNode(template.content, true);
    let article = templateClone.querySelector("article");
    let keys = ["nameOfPark", "noOfAdults", "noOfChildren"];
    for(let j = 0; j < 3; j++){
        article.children[j].innerHTML += listOfOrders[i][keys[j]];
    }
    document.getElementById("templateClones").append(article);
}

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

async function postOrder(collectedOrders) {
    const rawResponse = await fetch('api/placeorder', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({collectedOrders})
    })
    const content = await rawResponse.json()        
    console.log(content)
}