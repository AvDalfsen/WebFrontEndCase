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
        listOfOrders = []
    }
}