import OnirixEmbedSDK from "@onirix/embed-sdk";   
import OnirixMultiplayerModule from "../src/OnirixMultiplayerModule.js";

describe('End-to-end tests for OnirixMultiplayerModule', () => {
    const url = 'http://localhost:3000';

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
});