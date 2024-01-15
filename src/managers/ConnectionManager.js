
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
        resolve();
       // resolve(console.log(this.socket));
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
      if (this.playerID == null) {
        this.isMyTurn = true;
        this.playerID = data
      }
      if (this.playerID == data) {
        this.isMyTurn = true;
        console.log('My turn.');
      }
      console.log('My turn.' + this.playerID + " " + data);
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

  //method that notifies the win observers
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

  //this method sends a message to the server saying that the player won
  win() {
    this.socket.emit('win', this.room);
  }
  /**
   * Create a room
   * @param room name of the room
   * @returns a message with the id of the socket
   */
  createRoom(room) {
    this.room = room;
    this.respuesta = "";
    this.socket.emit('create-room', this.room, (response) => {
      // This is the callback function that will be executed when the server sends a response
      this.respuesta = response;
      console.log(response);
    });
    return 'create-room ' + this.socket.id;
  }


  /**
   * Delete a room
   * @returns a message with the id of the socket
   */
  deleteRoom() {
    if (this.room == '') {
      return 'No room to delete';
    }
    this.respuesta = "";
    this.socket.emit('close-room', this.room,(response) => {
      // This is the callback function that will be executed when the server sends a response
      this.respuesta = response;
      if(this.respuesta == true){ 
        this.room = '';
        this.roomPosition = -1;
      }
    });

    return 'delete-room ' + this.socket.id;
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


disconnect(){
  this.socket.disconnect();
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
        //console.log(this.isMyTurn)
      }, 100);
    });


  }


  /**
  * Check if the socket is connected
  * @returns true if the socket is connected
  */
  async checkConnection() {

    //console.log(this.socket?.connected);
    // Do not try to send if the socket is not connected.
    if (!this.socket?.connected) {
      console.error('Cannot send because the socket is not connected.');
    }
    //return await this.socket.connected;
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(this.socket.connected);
      }, 100);
    });
  }

  //get the room position
  getRoomPosition() {
    return this.roomPosition;
  }


}





export { ConnectionManager };
