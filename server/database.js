const { MongoClient, ObjectID } = require('mongodb');

const url = 'mongodb://localhost:27017';
const dbName = 'rygaard';
const collectionName = 'rygaard';

console.log('About to connect to database...');


function getAllBoats(callback) {
	get({}, callback)
}


function getBoat(id, callback) {
	get({ _id: new ObjectID(id) }, array => callback( array[0] ))
}

function get(filter, callback) {
	MongoClient.connect(
		url,
		{ useUnifiedTopology: true },
		async (error, client) => {
			if( error ) {
				callback('"ERROR!! Could not connect"');
				return;  // exit the callback function
			}
			const col = client.db(dbName).collection(collectionName);
			try {
				const cursor = await col.find(filter);
				const array = await cursor.toArray()
				callback(array);

			} catch(error) {
				console.log('Query error: ' + error.message);
				callback('"ERROR!! Query error"');

			} finally {
				client.close();
			}


			// .toArray((error, docs) => {
			// 	// console.log('find filter=', filter, error, docs);
			// 	if( error ) {
			// 		callback('"ERROR!! Query error"');
			// 	} else {
			// 		callback(docs);
			// 	}
			// 	client.close();
			// })// toArray - async
		}// connect callback - async
	)//connect - async
}

function addBoat(requestBody, callback) {
	// console.log('addHat', requestBody);
	const doc = requestBody
	MongoClient.connect(
		url,
		{ useUnifiedTopology: true },
		async (error, client) => {
			if( error ) {
				callback('"ERROR!! Could not connect"');
				return;  // exit the callback function
			}
			const col = client.db(dbName).collection(collectionName);
			try {
				// Wait for the resut of the query
				// If it fails, it will throw an error
				const result = await col.insertOne(doc);
				callback({
					result: result.result,
					ops: result.ops
				})

			} catch(error) {
				console.error('addBoat error: ' + error.message);
				callback('"ERROR!! Query error"');

			} finally {
				client.close();
			}
		}// connect callback - async
	)//connect - async
}






module.exports = {
	getAllBoats, getBoat, addBoat
}

//runQuery(boatInsert)

const boatUpdate = (col, whenDone) => {
    //const filter = { _id: new ObjectID("5d62f9ac559322bc151c056c") };
    const filter = { name: 'beret' };
    const update = { $inc: { price: 5 } };
    col.updateOne(filter, update, (error, result) => {
        if( error ) {
            console.log('Could not update that: ', error.message);
        } else {
            console.log('Its now updated: ', result.result);
        }
        whenDone();
    })
}
//runQuery(boatUpdate)



const boatDelete = (col, whenDone) => {
    const filter = { _id: new ObjectID("")};
    col.deleteOne(filter, (error, result) => {
        if( error ) {
            console.log('Could not remove that: ', error.message);
        } else {
            console.log('Removed that: ', result.result);
        }
        whenDone();
    })
}
//runQuery(boatDelete)


const deleteALL = (col, whenDone) => {
    const filter = {};
    col.deleteMany(filter, (error, result) => {
        if( error ) {
            console.log('Could not remove that: ', error.message);
        } else {
            console.log('Removed that: ', result.result);
        }
        whenDone();
    })
}
//runQuery(deleteALL)

