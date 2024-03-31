require('dotenv').config();
const { MongoClient } = require('mongodb');

// Connection URI
async function connectToMongoDB() {    
        const uri = process.env.MONGODB_URI;
        if (!uri) throw new Error('MongoDB URI is missing. Please set it in the .env file');
        const client = new MongoClient(uri);
        await client.connect();
        const dbconn =  client.db("s3_searchengine");
        return dbconn;
}

module.exports = { connectToMongoDB };