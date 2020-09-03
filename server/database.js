const { MongoClient, ObjectID } = require('mongodb');
const { query } = require('express');

const url = 'mongodb://localhost:27017';
const dbName = 'rygaard';
const collectionName = 'rygaard';

console.log('About to connect to database...');


function getAllBoats(callback) {
    console.log('get ALL boat func');
	get({}, callback)
}

function getBoat(id, callback) {
    console.log('get boat func');
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
		}
	)
}

function deleteBoat(id, callback) {
	console.log('deleteBoat ID: ', id);
	let filter = {_id: new ObjectID(id)}
	MongoClient.connect(
		url,
		{ useUnifiedTopology: true },
		async (error, client) => {
			if( error ) {
				('"ERROR!! Could not connect"');
				return;  // exit the callback function
			}
			const col = client.db(dbName).collection(collectionName);
			try {
				// Wait for the rest of the query
				// If it fails, it will throw an error
				const result = await col.deleteOne(filter);
				callback({
					result: result.result,
					ops: result.ops
				})

			} catch(error) {
				console.error('DELETE BOAT error: ' + error.message);
				callback('"ERROR!! Query error"');
			} finally {
				client.close();
			}
		}// connect callback - async
	)//connect - async
}
function addBoat(requestBody, callback) {
	console.log('addBoat: ', requestBody);
	const doc = requestBody
	MongoClient.connect(
		url,
		{ useUnifiedTopology: true },
		async (error, client) => {
			if( error ) {
				('"ERROR!! Could not connect"');
				return;  // exit the callback function
			}
			const col = client.db(dbName).collection(collectionName);
			try {
				// Wait for the rest of the query
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

//	http://localhost:3000/search/?word=nimbus&maxprice=30000
function search(query, callback) {
	console.log(query);
	const filter = {};
	if( query.word ) {
		filter.modelname = { "$regex": new RegExp(`.*${query.word}.*`)};
		//console.log(query.word,'WORD IS: ', filter.modelname);
	}
	if( query.maxprice ) {
		filter.price = { "$lte": Number(query.maxprice)};
		console.log(query.maxprice,'MAXPRICE IS: ', filter.price);
	}
	MongoClient.connect(
		url,
		{ useUnifiedTopology: true },
		async (error, client) => {
			if( error ) {
				callback('"ERROR!! Could not connect"');
				return;  // exit the callback function
			}
			const col = client.db(dbName).collection(collectionName);
			console.log(filter);
			try {
				const cursor = await col.find(filter).limit(5);
				const array = await cursor.toArray()
				callback(array);

			} catch(error) {
				console.log('Query error: ' + error.message);
				callback('"ERROR!! Query error"');

			} finally {
				client.close();
			}


		}// connect callback - async
	)//connect - async
}



module.exports = {
	getAllBoats, getBoat, addBoat, search, deleteBoat
}




//runQuery(boatInsert)

const boatUpdate = (col, whenDone) => {
    //const filter = { _id: new ObjectID("5f4d3a72377cc32a6c195c38nod") };
    const filter = { name: 'Thundershild' };
    const update = { $inc: { price: 5000 } };
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

