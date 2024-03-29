const { get } = require('mongoose');
const { connectToMongoDB } = require('./mdb.dal');


const countUsers = async () => {
    let db;
    try {
        const db = await connectToMongoDB();
        const count = await db.collection('players').countDocuments();
        console.log(`total users: ${count}`);
        return count;
    }
    catch (e) {
        console.error('Error getting users:', e);
        throw e;
    }
    finally {
        if (db) {
            db.close();
        }
    }
}
countUsers().catch(console.dir);

async function getUsers() {
    let db;
    try {
        const db = await connectToMongoDB();
        const cursor = await db.collection('players').find({}).limit(2);
        const users = await cursor.toArray();
        console.log(users);
        return users;
    }
    catch (e) {
        console.error('Error getting users:', e);
        throw e;
    }
    finally {
        if (db) {
            db.close();
        }
    }
}

getUsers().catch(console.dir);


