// const { get } = require('mongoose');
const { connectToMongoDB } = require('./mdb.dal');


const getAllPlayers = async (attribute, position) => {
    const { client, db } = await connectToMongoDB();
    try {
        const cursor = db.collection('players')
            .find({
                description: { $regex: new RegExp(attribute, 'i') },
                position: { $regex: new RegExp('^' + position + '$', 'i') }
            });
        const users = await cursor.toArray();
        // console.log(users);
        return users;
    }
    catch (e) {
        console.error('Error getting users:', e);
        throw e;
    }
    finally {
        if (client) {
            client.close();
        }
    }
}

const getPlayersByDescription = async (attribute, position, limit, offset) => {
    const { client, db } = await connectToMongoDB();
try {
    const cursor = db.collection('players')
        .find({
            description: { $regex: new RegExp(attribute, 'i') },
            position: { $regex: new RegExp('^' + position + '$', 'i') }
        })
        .skip(offset)
        .limit(limit);
    const users = await cursor.toArray();
    // console.log(users);
    return users;
}
catch (e) {
    console.error('Error getting users:', e);
    throw e;
}
finally {
    if (client) {
        client.close();
    }
}
}

module.exports = { getAllPlayers,getPlayersByDescription };

