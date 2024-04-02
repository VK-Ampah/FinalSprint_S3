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

module.exports = { connectToMongoDB };