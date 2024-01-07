import { ConnectionManager } from '../src/managers/ConnectionManager';


global.setImmediate = jest.fn((cb) => cb());

describe('ConnectionManager', () => {
  let connectionManager;
  const mockSocket = {
    emit: jest.fn((event, data) => {
      if (mockSocket.on.mock.calls.length > 0) {
        const [registeredEvent, callback] = mockSocket.on.mock.calls[0];
        if (registeredEvent === event) {
          callback(data);
        }
      }
    }), on: jest.fn(), connected: true
  };
  const mockSdk = {};

  const mockEventManager = {
    publish: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    connectionManager = new ConnectionManager('http://localhost', mockSdk);
    connectionManager.socket = mockSocket; // Mock the socket
    connectionManager.eventManager = mockEventManager; // Mock the eventManager
  });

  test('should create a room', () => {
    connectionManager.createRoom('testRoom');
    expect(mockSocket.emit).toHaveBeenCalledWith('create-room', 'testRoom', expect.any(Function));
  });
  test('should not delete a room', () => {  
    connectionManager.deleteRoom();
    expect(mockSocket.emit).not.toHaveBeenCalledWith('close-room', '', expect.any(Function));
  });

  test('should delete a room', () => {
    connectionManager.room = 'testRoom';
    connectionManager.deleteRoom();
    expect(mockSocket.emit).toHaveBeenCalledWith('close-room', 'testRoom', expect.any(Function));
  });

  test('JoinRoom- should join a room', () => {
    connectionManager.joinRoom('testRoom');
    expect(mockSocket.emit).toHaveBeenCalledWith('join-room', 'testRoom');
  });

  test('JoinRoom- should disconect the previus room if repeated', () => {
    connectionManager.joinRoom('1');
    connectionManager.joinRoom('2');
    expect(mockSocket.emit).toHaveBeenCalledWith('leave-room', '1');
  });

  test('should leave a room', () => {
    connectionManager.disconnectRoom();
    expect(mockSocket.emit).toHaveBeenCalledWith('leave-room', '');
  });

  test('should start a game', () => {
    connectionManager.startGame();
    expect(mockSocket.emit).toHaveBeenCalledWith('game-start', '');
  });

  test('should send a win message', () => {
    connectionManager.win();
    expect(mockSocket.emit).toHaveBeenCalledWith('win', '');
  });

  test('should publish a message', () => {
    const mockData = { event: 'test', data: { test: 'test', id: '', room: '', message: 'message' } };
    connectionManager.publish(mockData);
    expect(mockSocket.emit).toHaveBeenCalledWith('test', mockData);
  }
  );

  test('should pass turn', () => {
    connectionManager.nextTurn();
    expect(mockSocket.emit).toHaveBeenCalledWith('pass-turn', '');
  });

  test('should check turn', async () => {
    connectionManager.checkTurn();
    expect(mockSocket.emit).toHaveBeenCalledWith('is-my-turn', '');

  }
  );

  test('should check connection', async () => {
    await connectionManager.checkConnection();
    expect(mockSocket.connected).toBeTruthy();
  });

  test('should check connection', async () => {
    mockSocket.connected = false;
    await connectionManager.checkConnection();
    expect(mockSocket.connected).toBeFalsy();
  });

  test('should get the room position', async () => {
    connectionManager.roomPosition = 1;
    expect(connectionManager.getRoomPosition()).toBe(1);
  });

  test('should notify start observers', () => {
    const mockObserver = jest.fn();
    connectionManager.subscribeStartObservers(mockObserver);
    connectionManager.notifyStartObservers('test');
    expect(mockObserver).toHaveBeenCalledWith('test');
  });

  test('should notify turn observers', () => {
    const mockObserver = jest.fn();
    connectionManager.subscribeTurnObservers(mockObserver);
    connectionManager.notifyTurnObservers('test');
    expect(mockObserver).toHaveBeenCalledWith('test');
  });

  test('should notify win observers', () => {
    const mockObserver = jest.fn();
    connectionManager.subscribeWinObservers(mockObserver);
    connectionManager.notifyWinObservers('test');
    expect(mockObserver).toHaveBeenCalledWith('test');
  });

  test('should unsubscribe start observers', () => {
    const mockObserver = jest.fn();
    connectionManager.subscribeStartObservers(mockObserver);
    connectionManager.unsubscribeStartObservers(mockObserver);
    connectionManager.notifyStartObservers('test');
    expect(mockObserver).not.toHaveBeenCalled();
  });

  test('should unsubscribe turn observers', () => {
    const mockObserver = jest.fn();
    connectionManager.subscribeTurnObservers(mockObserver);
    connectionManager.unsubscribeTurnObservers(mockObserver);
    connectionManager.notifyTurnObservers('test');
    expect(mockObserver).not.toHaveBeenCalled();
  });

  test('should unsubscribe win observers', () => {
    const mockObserver = jest.fn();
    connectionManager.subscribeWinObservers(mockObserver);
    connectionManager.unsubscribeWinObservers(mockObserver);
    connectionManager.notifyWinObservers('test');
    expect(mockObserver).not.toHaveBeenCalled();
  });


});