const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:1234';
const dbName = 'rygaard';

MongoClient.connect(url, (err, client) => {
    if( err ) throw err;
    const db = client.db()
})