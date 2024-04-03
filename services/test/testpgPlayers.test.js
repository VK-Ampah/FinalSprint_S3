const { query } = require('../pg.dal');
const { getPlayers, getPlayersDescription } = require('../pgplayers');

jest.mock('../pg.dal', () => ({
    query: jest.fn(),
}));




describe('Database Actions', () => {
    beforeEach(() => {
        query.mockClear();
    });

    describe('getPlayers', () => {
        it('fetches players successfully', async () => {
            const mockPlayers = [{ id: 1, name: 'John Doe', description: 'A player', position: 'defender' }];
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
            const mockPlayers = [{ id: 1, name: 'Jane Doe', description: 'Another player', position: 'midfielder' }];
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
