const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 1337;

const { getBoat, getAllBoats, addBoat, search, deleteBoat } = require("./database.js");




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
    search(req.query, dataOrError => {
        res.send(dataOrError)
    })
})


app.get('/boat', (req, res) => {
    let id = req.query.id;
    console.log('We are TRY THIS GET BOAT: ', id);
    
    getBoat(id, dataOrError => {
        //console.log(id);
        res.send(dataOrError)
        //Skall hämta en båt med utsatt /x
    })
})

app.delete('/boat/:id', (req, res) => {
    let id = req.params.id;
    //console.log(req.params.id);
    //console.log(req.path);
    //let id = req.path;
    console.log('We are TRY TO DELETE:', id);
    
    deleteBoat(id, dataOrError => {
        //console.log(id);
        res.send(dataOrError)
        //Skall DELTE en båt med utsatt /x
    })
})

app.get('/boats', (req, res) => {
    getAllBoats(dataOrError => {
        res.send(dataOrError)
        //Skall hämta alla båtar
    })
})



app.post('/boat', (req, res) => {
    requestBody = req.body;
    addBoat(requestBody, dataOrError => {
        res.send(dataOrError);
        //Skall skapa en båt
    })
})






app.listen(port, () => console.log('Server is Listening on port: ' + port))