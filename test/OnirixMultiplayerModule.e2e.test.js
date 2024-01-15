import OnirixEmbedSDK from "@onirix/embed-sdk";   
import OnirixMultiplayerModule from "../src/OnirixMultiplayerModule.js";

describe('End-to-end tests for OnirixMultiplayerModule', () => {
    const url = 'http://localhost:3000';

    beforeEach(() => {
        // Clear the mocks before each test
        jest.clearAllMocks();
    });


    test('Test 1 create a room',  async () => {

        // Test 1 code
        const embedSDK = new OnirixEmbedSDK();
        const module = new OnirixMultiplayerModule(document, embedSDK, 'http://localhost:3000');
        // Create spies on the methods
        const createSessionSpy = jest.spyOn(module, 'createSession');
        const disconnectSpy = jest.spyOn(module.connectionManager, 'disconnect');
        await module.createSession("1234");
        // Check if the methods were called
        expect(createSessionSpy).toHaveBeenCalledWith("1234");
        // Disconnect after the session is created
        // Return a new Promise that resolves after disconnect is called
        return new Promise((resolve) => {
            setTimeout(async () => {
                await module.connectionManager.disconnect();
                // Check if disconnect was called after createSession
                expect(disconnectSpy).toHaveBeenCalled();
                // Resolve the Promise to indicate that the test is done
                resolve();
            }, 2000);
        });
    });

    test('Test 2 join a room',  async () => {

        // Test 2 code
        const embedSDK = new OnirixEmbedSDK();
        const module = new OnirixMultiplayerModule(document, embedSDK, 'http://localhost:3000');
        // Create spies on the methods
        const joinSessionSpy = jest.spyOn(module, 'joinSession');
        const disconnectSpy = jest.spyOn(module.connectionManager, 'disconnect');
        await module.joinSession("1234");
        // Check if the methods were called
        expect(joinSessionSpy).toHaveBeenCalledWith("1234");
        // Disconnect after the session is created
        // Return a new Promise that resolves after disconnect is called
        return new Promise((resolve) => {
            setTimeout(async () => {
                await module.connectionManager.disconnect();
                // Check if disconnect was called after createSession
                expect(disconnectSpy).toHaveBeenCalled();
                // Resolve the Promise to indicate that the test is done
                resolve();
            }, 2000);
        });
    });

    test('Test 3 create a room and join it',  async () => {

        // Test 3 code
        const embedSDK = new OnirixEmbedSDK();
        const module = new OnirixMultiplayerModule(document, embedSDK, 'http://localhost:3000');
        // Create spies on the methods
        const createSessionSpy = jest.spyOn(module, 'createSession');
        const joinSessionSpy = jest.spyOn(module, 'joinSession');
        const disconnectSpy = jest.spyOn(module.connectionManager, 'disconnect');
        await module.createSession("1234");
        await module.joinSession("1234");
        // Check if the methods were called
        expect(createSessionSpy).toHaveBeenCalledWith("1234");
        expect(joinSessionSpy).toHaveBeenCalledWith("1234");
        // Disconnect after the session is created
        // Return a new Promise that resolves after disconnect is called
        return new Promise((resolve) => {
            setTimeout(async () => {
                await module.connectionManager.disconnect();
                // Check if disconnect was called after createSession
                expect(disconnectSpy).toHaveBeenCalled();
                // Resolve the Promise to indicate that the test is done
                resolve();
            }, 2000);
        });
    });

    test('Test 4 create a room and delete it',  async () => {

        // Test 4 code
        const embedSDK = new OnirixEmbedSDK();
        const module = new OnirixMultiplayerModule(document, embedSDK, 'http://localhost:3000');
        // Create spies on the methods
        const createSessionSpy = jest.spyOn(module, 'createSession');
        const deleteSessionSpy = jest.spyOn(module, 'deleteSession');
        const disconnectSpy = jest.spyOn(module.connectionManager, 'disconnect');
        await module.createSession("1234");
        await module.deleteSession();
        // Check if the methods were called
        expect(createSessionSpy).toHaveBeenCalledWith("1234");
        expect(deleteSessionSpy).toHaveBeenCalled();
        // Disconnect after the session is created
        // Return a new Promise that resolves after disconnect is called
        return new Promise((resolve) => {
            setTimeout(async () => {
                await module.connectionManager.disconnect();
                // Check if disconnect was called after createSession
                expect(disconnectSpy).toHaveBeenCalled();
                // Resolve the Promise to indicate that the test is done
                resolve();
            }, 2000);
        });
    });

    
});