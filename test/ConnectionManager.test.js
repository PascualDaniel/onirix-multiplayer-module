import { ConnectionManager } from '../src/managers/ConnectionManager';


global.setImmediate = jest.fn((cb) => cb());

describe('ConnectionManager', () => {
  let connectionManager;
  const mockSocket = { emit: jest.fn(), on: jest.fn() };
  const mockSdk = {};

  beforeEach(() => {
    jest.clearAllMocks();
    connectionManager = new ConnectionManager('http://localhost', mockSdk);
    connectionManager.socket = mockSocket; // Mock the socket
  });

  test('should create a room', () => {
    connectionManager.createRoom('testRoom');
    expect(mockSocket.emit).toHaveBeenCalledWith('create-room', 'testRoom');
  });

  test('should join a room', () => {
    connectionManager.joinRoom('testRoom');
    expect(mockSocket.emit).toHaveBeenCalledWith('join-room', 'testRoom');
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

  
});