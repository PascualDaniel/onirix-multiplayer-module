// Import the module or class you want to test
import OnirixMultiplayerModule from '../src/OnirixMultiplayerModule.js';
import OnirixEmbedSDK from '@onirix/embed-sdk';
// Mock the dependencies
jest.mock('../src/managers/ConnectionManager.js');


describe('OnirixMultiplayerModule', () => {
    let module;

    beforeEach(() => {
        // Reset the mocks before each test
        jest.resetAllMocks();


        // Create a new instance of the mock OnirixEmbedSDK
        const embedSDK = new OnirixEmbedSDK();
        embedSDK.connect = jest.fn();

        module = new OnirixMultiplayerModule(document, embedSDK, 'http://localhost:3000');
    });

    test('should be defined', () => {
        expect(OnirixMultiplayerModule).toBeDefined();
    });

    test('should create a new instance', () => {
        expect(module).toBeInstanceOf(OnirixMultiplayerModule);
    });

    test('joinSession should call connectionManager.joinRoom', () => {
        module.joinSession();
        expect(module.connectionManager.joinRoom).toHaveBeenCalled();
    });

    test('createSession should call connectionManager.createRoom', () => {
        module.createSession();
        expect(module.connectionManager.createRoom).toHaveBeenCalled();
    });

    test('publish should call connectionManager.publish', () => {
        const data = { message: 'test' };
        module.publish(data);
        expect(module.connectionManager.publish).toHaveBeenCalledWith(data);
    });

    test('getRoomPosition should return the room position', () => {
        const position = 1;
        module.connectionManager.getRoomPosition.mockReturnValue(position);
        const result = module.getRoomPosition();
        expect(result).toEqual(position);
    });


    test('leaveSession should call connectionManager.disconnectRoom', () => {
        module.leaveSession();
        expect(module.connectionManager.disconnectRoom).toHaveBeenCalled();
    });

    test('startSession should call connectionManager.startGame', () => {
        module.startSession();
        expect(module.connectionManager.startGame).toHaveBeenCalled();
    });



  

    test('passTurn should call connectionManager.passTurn', () => {
        module.passTurn();
        expect(module.connectionManager.nextTurn).toHaveBeenCalled();
    });



});

