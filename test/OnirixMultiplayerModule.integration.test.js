import OnirixMultiplayerModule from '../src/OnirixMultiplayerModule.js';
import OnirixEmbedSDK from '@onirix/embed-sdk';

const io = require('socket.io-client');


const mockConnect = jest.fn();
const mockOn = jest.fn();
const mockEmit = jest.fn();


function mockSocketIo(url) {
    return {
        connected: true,
        connect: mockConnect,
        on: mockOn,
        emit: mockEmit,
    };
}

// Mock the entire module
jest.mock('socket.io-client', () =>  mockSocketIo);



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
        // Call the joinSession method
        await module.joinSession(roomName);
        // expect socket to have called connect
        expect(mockConnect).toHaveBeenCalled();

        expect(mockEmit).toHaveBeenCalled();

    });

    test('leaveSession should call ConnectionManager.disconnectRoom', async () => {
        // Mock the ConnectionManager.disconnectRoom method
        module.connectionManager.disconnectRoom = jest.fn();

        // Call the leaveSession method
        await module.leaveSession();

        // Expect the ConnectionManager.disconnectRoom method to be called
        expect(module.connectionManager.disconnectRoom).toHaveBeenCalled();


    });

    test('startGame should call ConnectionManager.startGame', async () => {

        // Call the startGame method
        await module.startSession();
        expect(mockConnect).toHaveBeenCalled();
        // Expect the ConnectionManager.startGame method to be called
        expect(mockEmit).toHaveBeenCalled();
    });

    test('publish should call ConnectionManager.publish', async () => {
        const data = 
            {
                id: "test",
                room: "test",
                message : "test"
            }

        // Call the publish method
        await module.publish(data);

        // Expect the ConnectionManager.publish method to be called
        expect(mockEmit).toHaveBeenCalled();
    });

   
    //createSession
    test('createSession should call ConnectionManager.createRoom', async () => {
        const roomName = 'testRoom';
        // Mock the ConnectionManager.createRoom method
        // Call the createSession method
        await module.createSession(roomName);

        // Expect the ConnectionManager.createRoom method to be called
        expect(mockEmit).toHaveBeenCalled();
    });


});