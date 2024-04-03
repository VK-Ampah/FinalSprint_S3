const { connectToMongoDB } = require('../mdb.dal');
const { getAllPlayers, getPlayersByDescription } = require('../mdbusers');

// Mocking the MongoDB connection
jest.mock('../mdb.dal', () => ({
    connectToMongoDB: jest.fn(),
}));

// Mock data for testing from mockeroo.com
const mockPlayers = [{
    _id: "60d3b41abdacab0026a733c6",
    first_name: "Briney",
    last_name: "Eberlein",
    position: "Honorable",
    goals_scored: 13,
    assists: 14,
    description: "Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum."
  },
  {
    _id: "60d3b41abdacab0026a733c7",
    first_name: "Bart",
    last_name: "Bartolommeo",
    position: "Honorable",
    goals_scored: 14,
    assists: 20,
    description: "Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum."    
    },
];

describe('MongoDB Actions', () => {
    // Mock the MongoDB connection and query operations
    beforeEach(() => {
        // mongodb mock chaining methds to avoid errors
        const toArray = jest.fn().mockResolvedValue(mockPlayers);
        const limit = jest.fn().mockReturnValue({ toArray });
        const skip = jest.fn().mockReturnValue({ limit });
        const find = jest.fn().mockReturnValue({ skip, limit, toArray }); 

        // pass the mock functions to the db object in order to simulate the mongodb query
        const db = {
            collection: jest.fn().mockReturnValue({ find, skip, limit, toArray }),
        };
        const client = { close: jest.fn() };

        connectToMongoDB.mockResolvedValue({ client, db });
    });

    describe('getAllPlayers', () => {
        it('fetches all players successfully', async () => {
            // Call the function and expect the mock data to be returned
            const players = await getAllPlayers('a', 'defender');
            // compare the returned data with the mock data
             expect(players).toEqual(mockPlayers);
            expect(connectToMongoDB).toHaveBeenCalled();// Check if the connection was made
        });
    });

    describe('getPlayersByDescription', () => {
        it('fetches players by description with pagination successfully', async () => {
            const players = await getPlayersByDescription('a', 'midfielder', 10, 0);
            expect(players).toEqual(mockPlayers);
            expect(connectToMongoDB).toHaveBeenCalled();
        });
    });
});
