const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';
const dbName = 'rygaard';
const collectionName = 'rygaard';

console.log('About to connect to database...');

MongoClient.connect(url, { useUnifiedTopology: true }, (error, client) => {
    if( error ) {
        console.log('Could not connect!', error.message);
        return;
    }
    console.log('Connected to database');

    const db = client.db(dbName);
    const col = db.collection(collectionName);
    insertBoats(col, () => {
        findBoats(col, () => client.close())
    });
})



function findBoats(col, callback) {
    col.find({}).toArray((error, docs) => {
        try {
            if( error ) {
                console.log('Bad find query!', error.message);
                return;
            }
            console.log('Found documents:');
            docs.forEach(doc => {
                console.log('* ' + doc.name);
            })
        } finally {
            callback();
        }
    })
}



function insertBoats(col, callback) {
    col.insertMany(
        [
            { modelname: 'Nimbus 2000', price: 1000000, year: 2000, motor: true, sail: false, },
            { modelname: 'Nimbus 2010', price: 2000000, year: 2010, motor: true, sail: false, },
            { modelname: 'Nimbus 2000', price: 3000000, year: 2020, motor: true, sail: false, },

        ],
        (error, result) => {
            try {
                if( error ) {
                    console.log('Bad insert query!', error.message);
                    return;
                }
                console.log('Query successful, added hats.');
                console.log(result);
            } finally {
                // client.close();
                callback();
            }
        }
    )
}