const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 1337;

const { getBoat, getAllBoats, addBoat } = require("./database.js");




// MIDDLEWARES
app.use( express.static(__dirname + '/../public') )
app.use( express.static(__dirname + '/../assets') )
app.use( (req, res, next) => {      //LOGGER 
    console.log(`${req.method} ${req.url}`);
    next();
} )
//app.use( bodyParser.json([options]) )
app.use( bodyParser.urlencoded({ extended: true }) )
app.use( bodyParser.json() )


// ROUTES
app.get('/', (req, res) => {
    //skall hämta index från public/index.html
})

app.get('/search', (req, res) => {
    //skall hantera sök funktionen
})


app.get('/api/boat', (res, req) => {
    getBoat(req.query.id, dataOrError => {
        res.send(dataOrError)
        //ROUT SKALL KUNNA HANTERA 
    })
})

app.get('/api/boats', (res, req) => {
    getAllBoats(dataOrError => {
        res.send(dataOrError)
        //ROUT SKALL KUNNA HANTERA 
    })
})


app.post('/api/boat?', (req, res) => {
    addBoat(dataOrError => {
        res.send(dataOrError);
    })
})









app.listen(port, () => console.log('Server is Listening on port: ' + port))