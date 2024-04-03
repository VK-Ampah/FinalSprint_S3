const { query } = require('../pg.dal');
const { getPlayers, getPlayersDescription } = require('../pgplayers');


// Mock the pg database actions
jest.mock('../pg.dal', () => ({
    query: jest.fn(),
}));

const mockPlayers = [{
    id: 1,
    first_name: "Briney",
    last_name: "Eberlein",
    position: "Honorable",
    goals_scored: 13,
    assists: 14,
    description: "Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum."
  },
  {
    id: 2,
    first_name: "Bart",
    last_name: "Bartolommeo",
    position: "Honorable",
    goals_scored: 14,
    assists: 20,
    description: "Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum."    
    },
];

//
describe('Database Actions', () => {
    beforeEach(() => {
        query.mockClear();
    });

    describe('getPlayers', () => {
        it('fetches players successfully', async () => {
            query.mockResolvedValueOnce({ rows: mockPlayers });
            const players = await getPlayers('a', 'defender');
            expect(query).toHaveBeenCalledWith(expect.any(String), expect.any(Array));
            expect(players).toEqual(mockPlayers);
        });

        it('handles errors', async () => {
            query.mockRejectedValueOnce(new Error('Database error'));

            await expect(getPlayers('a', 'defender')).rejects.toThrow('Database error');
        });
    });

    describe('getPlayersDescription', () => {
        it('fetches players with pagination successfully', async () => {
            query.mockResolvedValueOnce({ rows: mockPlayers });
            const players = await getPlayersDescription('a', 'midfielder', 10, 0);
            expect(query).toHaveBeenCalledWith(expect.any(String), expect.any(Array));
            expect(players).toEqual(mockPlayers);
        });

        it('handles errors', async () => {
            query.mockRejectedValueOnce(new Error('Database error'));
            await expect(getPlayersDescription('a', 'midfielder', 10, 0)).rejects.toThrow('Database error');
        });
    });
});
