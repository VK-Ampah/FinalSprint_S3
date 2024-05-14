require('dotenv').config();
const { MongoClient } = require('mongodb');

// Connection URI to return a client instance and a connection to the MongoDB cluster
async function connectToMongoDB() {    
        const uri = process.env.MONGODB_URI;
        if (!uri) throw new Error('MongoDB URI is missing. Please set it in the .env file');
        const client = new MongoClient(uri);
        await client.connect();
        const db =  client.db("s3_searchengine");
        return { client, db };
    }
// create index on search fields
const createIndex = async () => {
    // connect
    const { client, db } = await connectToMongoDB();
    const collection = db.collection('players');
    await collection.createIndex({ description: 'text' });
    await collection.createIndex({ position: 1 });
    // list the indexes
    const indexes = await collection.indexes();
    console.log('Indexes:', indexes);
}

module.exports = { connectToMongoDB };