import OnirixMultiplayerModule from '../src/OnirixMultiplayerModule.js';
import OnirixEmbedSDK from '@onirix/embed-sdk';


describe('OnirixMultiplayerModule Integration Test', () => {
    let module;
    beforeEach(() => {
        // Reset the mocks before each test
        jest.resetAllMocks();



        const embedSDK = new OnirixEmbedSDK();
        embedSDK.connect = jest.fn();
        module = new OnirixMultiplayerModule(document, embedSDK, 'http://localhost:3000');






    });

    test('joinSession should call ConnectionManager.joinRoom', async () => {
        const roomName = 'testRoom';

        // Mock the ConnectionManager.joinRoom method
        module.connectionManager.joinRoom = jest.fn();

        // mock socket io
        module.connectionManager.socket = {
            connect: jest.fn(),
            on: jest.fn(),
            emit: jest.fn(),
        };

        // Call the joinSession method
        await module.joinSession(roomName);

        // Expect the ConnectionManager.joinRoom method to be called with the correct arguments
        expect(module.connectionManager.joinRoom).toHaveBeenCalledWith(roomName);

        // expect socket to have called connect
        expect(module.connectionManager.socket.connect).toHaveBeenCalled();
        
        
        // expect socket to be connected
        expect(module.connectionManager.socket.emit).toHaveBeenCalledWith('join-room', roomName);

    });


});