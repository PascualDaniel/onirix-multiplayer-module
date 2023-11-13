
import io from 'socket.io-client';
import { EventManager } from ".";




class ConnectionManager {

  socket = '';
  room = '';

  playerID = '';

  embedSDK = '';

  roomPosition = -1;

  eventManager = "";

  stated = false;

  startObservers = [];

  turnObservers = [];

  winObservers = [];

  isMyTurn = false;

  winner = "";

  constructor(url, sdk) {
    this.embedSDK = sdk;
    //SEE IF URL IS not null and if it is then use the default url
    //if not then use the url that was passed in
    if (url == null) {
      url = 'http://localhost:3000';
    }
    this.socket = io(url);
    this.socket.connect();


    this.eventManager = new EventManager(sdk);

    new Promise(resolve => {
      setTimeout(() => {
        resolve(console.log(this.socket));
        this.playerID = this.socket.id;
      }, 100);
    });


    /*
         * Handle 'published' message. This is a custom message sent from the server.
         */
    this.socket.on('published', (data) => {
      if (data.id != this.playerID) {
        this.eventManager.publish(data);
      }
      else {
        console.log("I am the sender");
      }
    });

    //room-info
    this.socket.on('room-info', (data) => {
      if (this.roomPosition == -1) {
        this.roomPosition = data;
      }
      console.log("room " + this.roomPosition + " " + data);
    });

    this.socket.on('start', () => {

      console.log('start');
      this.start = true;
      this.notifyStartObservers("start");

    });

    this.socket.on('your-turn', (data) => {
      if (this.playerID == data) {
        this.isMyTurn = true;
        console.log('My turn.');
      }
    });
    this.socket.on('winner', (data) => {
      this.winner = data;
      if (this.playerID == data) {
        this.notifyWinObservers(data);
        console.log('win');
      }
    });

    this.socket.on('next-turn', (data) => {
      if (this.playerID == data) {
        this.isMyTurn = true;
        console.log('My turn.');
      }
      this.notifyTurnObservers(this.playerID == data);
      console.log('next-turn');
    });

    this.socket.on('connect', () => {

      console.log('Connected to server.');
    });
    this.socket.on('disconnect', () => {
      console.log('Connected to server.');
    });

    this.socket.on('join-room', () => {
      console.log('join-room to server.');
    });
  }

  //method for start observers to notify 
  notifyStartObservers(data) {
    for (let i = 0; i < this.startObservers.length; i++) {
      this.startObservers[i](data);
    }
  }

  //method for start observers to subscribe
  subscribeStartObservers(func) {
    this.startObservers.push(func);
  }

  //method for start observers to unsubscribe
  unsubscribeStartObservers(func) {
    for (let i = 0; i < this.startObservers.length; i++) {
      if (this.startObservers[i] == func) {
        this.startObservers.splice(i, 1);
      }
    }
  }

  //method for  turn observers to notify
  notifyTurnObservers(data) {
    for (let i = 0; i < this.turnObservers.length; i++) {
      this.turnObservers[i](data);
    }
  }

  //method for turn observers to subscribe
  subscribeTurnObservers(func) {
    this.turnObservers.push(func);
  }

  //method for turn observers to unsubscribe
  unsubscribeTurnObservers(func) {
    for (let i = 0; i < this.turnObservers.length; i++) {
      if (this.turnObservers[i] == func) {
        this.turnObservers.splice(i, 1);
      }
    }
  }

   //method for  win observers to notify
   notifyWinObservers(data) {
    for (let i = 0; i < this.winObservers.length; i++) {
      this.winObservers[i](data);
    }
  }

  //method for win observers to subscribe
  subscribeWinObservers(func) {
    this.winObservers.push(func);
  }

  //method for win observers to unsubscribe
  unsubscribeWinObservers(func) {
    for (let i = 0; i < this.winObservers.length; i++) {
      if (this.winObservers[i] == func) {
        this.winObservers.splice(i, 1);
      }
    }
  }


  win(){
    this.socket.emit('win', this.room);
  }
  /**
   * Create a room
   * @param room name of the room
   * @returns a message with the id of the socket
   */
  createRoom(room) {
    this.room = room;
    this.socket.emit('create-room', this.room);
    return 'create-room ' + this.socket.id;
  }

  /**
   * Disconnect from a room
   * @returns a message with the id of the socket
   */
  disconnectRoom() {
    this.start = false;
    this.socket.emit('leave-room', this.room);

    this.room = '';
    this.roomPosition = -1;
    return 'leave-room' + this.socket.id;
  }

  /**
  * Join a room
  * @param room name of the room
  * @returns a message with the id of the socket 
  */
  joinRoom(room) {
    this.start = false;
    if (this.room != '') {
      this.disconnectRoom();

    }

    this.room = room;
    // this.io.join(room);
    this.socket.emit('join-room', this.room);
    return 'join-room' + this.socket.id;
  }
  /**
  * Start the game, only the host can start the game
  * @returns a message 
  */
  startGame() {

    this.socket.emit('game-start', this.room);

    return 'start';
  }



  /**
   * Hear an event
   * @param event name of the event
   * @param func function to execute
   * @returns the listener
   */
  subscribe(event, func) {
    return this.eventManager.subscribe(event, func);
  }



  /**
  * Dispatch an event
  * @param ev name of the event
  * @param args data to send
  */
  triggerEvent(ev, args) {
    this.eventManager.triggerEvent(ev, args);
  }

  /**
  * Publish an event
  * @param data data to send to the server
  * @returns a mesaage with the id of the socket and the room
  */
  publish(data) {
    this.checkConnection();
    //  Send a message to the server

    this.eventManager.publish(data);

    data['id'] = this.socket.id;
    data['room'] = this.room;
    data['message'] = "message";
    this.socket.emit(data.event, data);
    // this.socket.emit(data.event, data);

    //this.io.to(this.room).emit('message', 'for your eyes only');
    return 'published ' + this.socket.id + " " + this.room;
  }

/**
 * Pass the turn to the next player
 */
  nextTurn() {
    this.socket.emit('pass-turn', this.room);
  }

  async checkTurn() {
    this.socket.emit('is-my-turn', this.room);

     return new Promise(resolve => {
      setTimeout(() => {
        resolve(this.isMyTurn);
        console.log(this.isMyTurn)
      }, 100);
    });

    
  }


  /**
  * Check if the socket is connected
  * @returns true if the socket is connected
  */
  async checkConnection() {
    if (this.socket == null) {
      //throw error
      //console.error('Cannot join because the socket is not connected.');
      return;
    }
    console.log(this.socket?.connected);
    // Do not try to send if the socket is not connected.
    if (!this.socket?.connected) {
      // console.error('Cannot send because the socket is not connected.');
    }
    //return await this.socket.connected;
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(this.socket.connected);
      }, 2000);
    });
  }

  //get the room position
  getRoomPosition() {
    return this.roomPosition;
  }



}





export { ConnectionManager };
