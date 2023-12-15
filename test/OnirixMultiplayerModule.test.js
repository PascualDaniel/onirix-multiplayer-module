


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

        module = new OnirixMultiplayerModule( document, embedSDK, 'http://localhost:3000');
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
    
    test('joinSession should call connectionManager.joinRoom', () => {
        module.joinSession();
        expect(module.connectionManager.joinRoom).toHaveBeenCalled();
    });

    test('createSession should call connectionManager.createRoom', () => {
        module.createSession();
        expect(module.connectionManager.createRoom).toHaveBeenCalled();
    });

});

