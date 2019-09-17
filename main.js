var mysql = require('mysql2');

var connection = mysql.createConnection({
  host: "localhost",
  user: "henk",
  password: "henk",
  database: "mydb"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

let henk = "";
connection.query("SELECT event_name FROM events WHERE event_id = 3", function(err, result) {
    if (err) throw err;
    let henk = result[0]['event_name']
    console.log(henk) 
}, console.log(henk))

/**
 * Server side code using the express framework running on a Node.js server.
 * 
 * Load the express framework and create an app.
 */
const express = require('express');
const app = express();
/** 
 * Host all files in the client folder as static resources.
 * That means: localhost:8080/someFileName.js corresponds to client/someFileName.js.
 */
app.use(express.static('client'));

/**
 * Allow express to understand json serialization.
 */
app.use(express.json());

/**
 * Our code starts here.
 */
console.log(henk)
const attractions = [
    { 
        name: "De Efteling",
        description: "The Dutch fairy tale themed park. In high demand!",
        adultPrice: 32,
        kidsPrice: 32,
        minimumNumberOfAdults: 2,
        minimumNumberOfKids: 1,
        discount: 15,
        available: 1,
        location: { lon: 5.043689, lat: 51.649718, },
    },

    { 
        name: "Madurodam",
        description: "The Netherlands' smallest theme park.",
        adultPrice: 25,
        kidsPrice: 20,
        minimumNumberOfAdults: 1,
        minimumNumberOfKids: 2,
        discount: 25,
        available: 5,
        location: { lat: 52.0994779, lon: 4.299619900000039 },
    },

    { 
        name: 'Toverland',
        description: "Experience magic and wonder.",
        adultPrice: 30,
        kidsPrice: 30,
        minimumNumberOfAdults: 2,
        minimumNumberOfKids: 2,
        discount: 33,
        available: 3,
        location: { lat: 52.0994779, lon: 4.299619900000039 },
    },

    { 
        name: "Walibi Holland",
        description: "Need an Adrenaline Rush?",
        adultPrice: 37,
        kidsPrice: 37,
        minimumNumberOfAdults: 4,
        minimumNumberOfKids: 0,
        discount: 10,
        available: 20,
        location: { lon: 5.766986, lat: 52.438554, },
    },
    
    { 
        name: "Duinrell",
        description: "From the Kikkerbaan to the Tikibad.",
        adultPrice: 22,
        kidsPrice: 19,
        minimumNumberOfAdults: 1,
        minimumNumberOfKids: 3,
        discount: 7,
        available: 20,
        location: { lon: 4.383922, lat: 52.147433, },
    }, 

    { 
        name: "Slagharen",
        description: "Fun for the whole family in a true western style.",
        adultPrice: 28,
        kidsPrice: 20,
        minimumNumberOfAdults: 2,
        minimumNumberOfKids: 2,
        discount: 50,
        available: 2,
        location: { lat: 52.6249522, lon: 6.563149500000009 },
    }, 

    { 
        name: "Drievliet",
        description: "Come and experience our wonderful attractions.",
        adultPrice: 26,
        kidsPrice: 24,
        minimumNumberOfAdults: 1,
        minimumNumberOfKids: 2,
        discount: 25,
        available: 0,
        location: { lon: 4.352633, lat: 52.052608, },
    }, 
]

/**
 * A route is like a method call. It has a name, some parameters and some return values.
 * 
 * Name: /api/attractions
 * Parameters: the request as made by the browser
 * Return value: the list of attractions defined above as JSON
 * 
 * In addition to this, it has a HTTP method: GET, POST, PUT, DELETE
 * 
 * Whenever we make a request to our server,
 * the Express framework will call one of the methods defined here.
 * These are just regular functions. You can edit, expand or rewrite the code here as needed.
 */
app.get("/api/attractions", function (request, response) {
    console.log("Api call received for /attractions");

    response.json(attractions)
});

app.post("/api/placeorder", function (request, response) {
    console.log("Api call received for /placeorder");
    /**
     * Send the status code 200 back to the clients browser.
     * This means OK.
     */
    response.sendStatus(200);
    postToArray(request.body)
});

function postToArray(body) {
    orders = [] 
    for(let i = 0; i < Object.keys(body).length; i++){
        orders.push(body["order"+i])
    }
    console.log(orders)
    updateTicketAvailability(orders)
}

function updateTicketAvailability(orders) {
    for(let i = 0; i < orders.length; i++){
        for(let j = 0; j < attractions.length; j++){
            if(orders[i]["nameOfPark"] == attractions[j]["name"]){
                attractions[j]["available"] -= (orders[i]["noOfAdults"] + orders[i]["noOfChildren"])
            }
        }
    } 
}

app.get("/api/myorders", function (request, response) {
    console.log("Api call received for /myorders");

    response.sendStatus(200);
});

app.get("/api/admin/edit", function (request, response) {
    console.log("Api call received for /admin/edit");

    response.sendStatus(200);
});

/**
 * Make our webserver available on port 8000.
 * Visit localhost:8000 in any browser to see your site!
 */
app.listen(8000, () => console.log('Example app listening on port 8000!'));

connection.end(function(err) {
    if (err) throw err;
    console.log("Connected!");
});