import { EventManager } from '../src/managers/EventManager';
import OnirixEmbedSDK from '@onirix/embed-sdk';

describe('EventManager Integration Test', () => {
  let eventManager;
  let embedSDK;

  beforeEach(() => {
    embedSDK = new OnirixEmbedSDK();
    // Mock the methods of embedSDK that you expect to be called
    embedSDK.enable = jest.fn();
    embedSDK.disable = jest.fn();
    // Add more methods as needed...

    eventManager = new EventManager(embedSDK);
  });

  test('should call the correct embedSDK method when publishing an event', () => {
    const mockData = { action: 'enable' };
    eventManager.publish(mockData);
    expect(embedSDK.enable).toHaveBeenCalled();

    mockData.action = 'disable';
    eventManager.publish(mockData);
    expect(embedSDK.disable).toHaveBeenCalled();

    // Add more assertions as needed...
  });
});