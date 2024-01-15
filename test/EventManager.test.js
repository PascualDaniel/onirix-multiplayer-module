import { EventManager } from '../src/managers/EventManager';
import OnirixEmbedSDK from '@onirix/embed-sdk';

describe('EventManager Unitary Test', () => {
  let eventManager;
  let embedSDK;

  const events = ['enable', 'disable', 'rotate', 'toggle', 'setLabelText',
    'enableAll', 'disableAll', 'play', 'pause', 'translate', 'rotateTo'
    , 'rotateToQuaternion', 'scale', 'playAnimation', 'stopAnimation', 'translateToPosition'
    , 'translateToElement', 'resetScenes'];


  beforeEach(() => {
    embedSDK = new OnirixEmbedSDK();
    // Mock the methods of embedSDK that you expect to be called
    embedSDK.enable = jest.fn();
    embedSDK.disable = jest.fn();
    embedSDK.enableAll = jest.fn();
    embedSDK.disableAll = jest.fn();
    embedSDK.pause = jest.fn();
    embedSDK.rotate = jest.fn();
    embedSDK.toggle = jest.fn();
    embedSDK.resetScenes = jest.fn();
    embedSDK.setLabelText = jest.fn();
    embedSDK.play = jest.fn();
    embedSDK.pause = jest.fn();
    embedSDK.resetScenes = jest.fn();
    embedSDK.translate = jest.fn();
    embedSDK.rotateTo = jest.fn();
    embedSDK.rotateToQuaternion = jest.fn();
    embedSDK.scale = jest.fn();
    embedSDK.playAnimation = jest.fn();
    embedSDK.stopAnimation = jest.fn();
    embedSDK.translateToPosition = jest.fn();
    embedSDK.translateToElement = jest.fn();



    eventManager = new EventManager(embedSDK);


  });

  test('should call the correct embedSDK method when publishing an event', () => {
    const mockData = { action: 'enable' };
    eventManager.publish(mockData);
    expect(embedSDK.enable).toHaveBeenCalled();

    mockData.action = 'disable';
    eventManager.publish(mockData);
    expect(embedSDK.disable).toHaveBeenCalled();
  });

  test('should not call any embedSDK method when publishing an unknown event', () => {
    const mockData = { action: 'unknown' };
    eventManager.publish(mockData);
    expect(embedSDK.enable).not.toHaveBeenCalled();
    expect(embedSDK.disable).not.toHaveBeenCalled();
  });

  test('should handle multiple publish calls correctly', () => {
    const mockData = { action: 'enable' };
    eventManager.publish(mockData);
    eventManager.publish(mockData);
    expect(embedSDK.enable).toHaveBeenCalledTimes(2);

    mockData.action = 'disable';
    eventManager.publish(mockData);
    eventManager.publish(mockData);
    expect(embedSDK.disable).toHaveBeenCalledTimes(2);
  });

  test('should call the correct embedSDK method when publishing the ENABLE event', () => {
    const mockData = { action: 'enable' };
    eventManager.publish(mockData);
    expect(embedSDK.enable).toHaveBeenCalled();
  });

  test('should call the correct embedSDK method when publishing the DISABLE event', () => {
    const mockData = { action: 'disable' };
    eventManager.publish(mockData);
    expect(embedSDK.disable).toHaveBeenCalled();
  });

  test('should call the correct embedSDK method when publishing the ENABLE_ALL event', () => {
    const mockData = { action: 'enableAll' };
    eventManager.publish(mockData);
    expect(embedSDK.enableAll).toHaveBeenCalled();
  });

  test('should call the correct embedSDK method when publishing the DISABLE_ALL event', () => {
    const mockData = { action: 'disableAll' };
    eventManager.publish(mockData);
    expect(embedSDK.disableAll).toHaveBeenCalled();
  });


  test('should call the correct embedSDK method when publishing the PAUSE event', () => {
    const mockData = { action: 'pause' };
    eventManager.publish(mockData);
    expect(embedSDK.pause).toHaveBeenCalled();
  });

  test('should call the correct embedSDK method when publishing the ROTATE event', () => {
    const mockData = { action: 'rotate', element: 'element1', x: 1, y: 2, z: 3, time: 1, loop: true };
    eventManager.publish(mockData);
    expect(embedSDK.rotate).toHaveBeenCalledWith('element1', 1, 2, 3, 1, true);
  });

  test('should call the correct embedSDK method when publishing the TOGGLE event', () => {
    const mockData = { action: 'toggle', element: 'element1', transition: 1, time: 2 };
    eventManager.publish(mockData);
    expect(embedSDK.toggle).toHaveBeenCalledWith('element1', 1, 2);
  });



  test('should call the correct embedSDK method when publishing the RESET_SCENES event', () => {
    const mockData = { action: 'resetScenes' };
    eventManager.publish(mockData);
    expect(embedSDK.resetScenes).toHaveBeenCalled();
  });

  test('should call the correct embedSDK method when publishing the SET_LABEL_TEXT event', () => {
    const mockData = { action: 'setLabelText', element: 'element1', text: 'label' };
    eventManager.publish(mockData);
    expect(embedSDK.setLabelText).toHaveBeenCalledWith('element1', 'label');
  });

  test('should call the correct embedSDK method when publishing the PLAY event', () => {
    const mockData = { action: 'play', element: 'element1' };
    eventManager.publish(mockData);
    expect(embedSDK.play).toHaveBeenCalledWith('element1');
  });

  test('should call the correct embedSDK method when publishing the PAUSE event', () => {
    const mockData = { action: 'pause', element: 'element1' };
    eventManager.publish(mockData);
    expect(embedSDK.pause).toHaveBeenCalledWith('element1');
  });


  test('should call the correct embedSDK method when publishing the RESET_SCENES event', () => {
    const mockData = { action: 'resetScenes' };
    eventManager.publish(mockData);
    expect(embedSDK.resetScenes).toHaveBeenCalled();
  });

  test('should call the correct embedSDK method when publishing the TRANSLATE event', () => {
    const mockData = { action: 'translate', element: 'element1', x: 1, y: 2, z: 3, time: 1, loop: true };
    eventManager.publish(mockData);
    expect(embedSDK.translate).toHaveBeenCalledWith('element1', 1, 2, 3, 1, true);
  });

  test('should call the correct embedSDK method when publishing the ROTATE_TO event', () => {
    const mockData = { action: 'rotateTo', element: 'element1', x: 1, y: 2, z: 3, time: 1, loop: true };
    eventManager.publish(mockData);
    expect(embedSDK.rotateTo).toHaveBeenCalledWith('element1', 1, 2, 3, 1, true);
  });

  test('should call the correct embedSDK method when publishing the TRANSLATE_TO_ELEMENT event', () => {
    const mockData = { action: 'translateToElement', element: 'element1', target: 'element2', time: 1, lookAt: true };
    eventManager.publish(mockData);
    expect(embedSDK.translateToElement).toHaveBeenCalledWith('element1', 'element2', 1, true);
  });

  test('should call the correct embedSDK method when publishing the ROTATE_TO_QUATERNION event', () => {
    const mockData = { action: 'rotateToQuaternion', element: 'element1', x: 1, y: 2, z: 3, w: 1, time: 1, loop: true };
    eventManager.publish(mockData);
    expect(embedSDK.rotateToQuaternion).toHaveBeenCalledWith('element1', 1, 2, 3, 1, 1, true);
  });

  test('should call the correct embedSDK method when publishing the SCALE event', () => {
    const mockData = { action: 'scale', element: 'element1', x: 1, y: 2, z: 3, time: 1, loop: true };
    eventManager.publish(mockData);
    expect(embedSDK.scale).toHaveBeenCalledWith('element1', 1, 2, 3, 1, true);
  });

  test('should call the correct embedSDK method when publishing the PLAY_ANIMATION event', () => {
  const mockData = { action: 'playAnimation', element: 'element1', name: 'animation1', time: 1, loop: true };
  eventManager.publish(mockData);
  expect(embedSDK.playAnimation).toHaveBeenCalledWith('element1', 'animation1', true, false, 1);
});

  test('should call the correct embedSDK method when publishing the STOP_ANIMATION event', () => {
    const mockData = { action: 'stopAnimation', element: 'element1' };
    eventManager.publish(mockData);
    expect(embedSDK.stopAnimation).toHaveBeenCalledWith('element1');
  });

  test('should call the correct embedSDK method when publishing the TRANSLATE_TO_POSITION event', () => {
    const mockData = { action: 'translateToPosition', element: 'element1', x: 1, y: 2, z: 3, time: 1, lookAt: true };
    eventManager.publish(mockData);
    expect(embedSDK.translateToPosition).toHaveBeenCalledWith('element1', 1, 2, 3, 1, true);
  });

});