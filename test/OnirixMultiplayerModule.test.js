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




    test('win should call connectionManager.win', () => {
        module.win();
        expect(module.connectionManager.win).toHaveBeenCalled();
    });

    test('checkTurn should call connectionManager.checkTurn', () => {
        module.checkTurn();
        expect(module.connectionManager.checkTurn).toHaveBeenCalled();
    });

    test('subscribeStartObservers should call connectionManager.subscribeStartObservers', () => {
        const func = jest.fn();
        module.subscribeStartObservers(func);
        expect(module.connectionManager.subscribeStartObservers).toHaveBeenCalledWith(func);
    }   
    );

    test('unsubscribeStartObservers should call connectionManager.unsubscribeStartObservers', () => {
        const func = jest.fn();
        module.unsubscribeStartObservers(func);
        expect(module.connectionManager.unsubscribeStartObservers).toHaveBeenCalledWith(func);
    }   
    );

    test('subscribeTurnObservers should call connectionManager.subscribeTurnObservers', () => {
        const func = jest.fn();
        module.subscribeTurnObservers(func);
        expect(module.connectionManager.subscribeTurnObservers).toHaveBeenCalledWith(func);
    }   
    );

    test('unsubscribeTurnObservers should call connectionManager.unsubscribeTurnObservers', () => {
        const func = jest.fn();
        module.unsubscribeTurnObservers(func);
        expect(module.connectionManager.unsubscribeTurnObservers).toHaveBeenCalledWith(func);
    }   
    );

    test('subscribeWinObservers should call connectionManager.subscribeWinObservers', () => {
        const func = jest.fn();
        module.subscribeWinObservers(func);
        expect(module.connectionManager.subscribeWinObservers).toHaveBeenCalledWith(func);
    }   
    );

    test('unsubscribeWinObservers should call connectionManager.unsubscribeWinObservers', () => {
        const func = jest.fn();
        module.unsubscribeWinObservers(func);
        expect(module.connectionManager.unsubscribeWinObservers).toHaveBeenCalledWith(func);
    }   
    );

   





});

