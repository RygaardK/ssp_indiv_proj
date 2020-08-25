const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'rygaard';
const collection = '';

MongoClient.connect(url, { useUnifiedTopology: true}, (err, client) => {
    if( err ) {
        console.log('Some wrong!');
        return;
    }
    console.log('Connected to DB');
    client.close();
    //const db = client.db()

})