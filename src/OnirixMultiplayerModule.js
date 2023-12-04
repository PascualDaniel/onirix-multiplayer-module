import { ConnectionManager } from "./managers";
import OnirixEmbedSDK from "@onirix/embed-sdk";

class OnirixMultiplayerModule {

  /**
* URL of the place where the server is displyed
*/
  SOCKET_URL = 'http://[::1]:3000';


  embedSDK = '';

  connectionManager = "";


  // TODO
  //añadir IP al consytructor

  constructor(document, embedSDKp, url) {
    
    if (url != null) {
      this.SOCKET_URL = url;
    }

    this.embedSDK = new OnirixEmbedSDK(document,"http://127.0.0.1:5500" );

    if (embedSDKp != null) {
      this.embedSDK = embedSDKp;
    }

    this.embedSDK.connect();


    this.connectionManager = new ConnectionManager(SOCKET_URL, this.embedSDK);

  }


  async joinSession(roomName) {
    return this.connectionManager.joinRoom(roomName);
  }
  async createSession(roomName) {
    return this.connectionManager.createRoom(roomName);
  }

  async leaveSession() {
    return this.connectionManager.disconnectRoom();
  }
  async startSession() {
    return this.connectionManager.startGame();
  }



  async publish(data) {
    return this.connectionManager.publish(data);
  }

 


  /**
   * get room position
   * @returns the room position
   * */
  getRoomPosition() {
    return this.connectionManager.getRoomPosition();
  }


  //method for start observers to subscribe
  subscribeStartObservers(func) {
    this.connectionManager.subscribeStartObservers(func);
  }

  //method for start observers to unsubscribe
  unsubscribeStartObservers(func) {
    this.connectionManager.unsubscribeStartObservers(func);
  }


  subscribeTurnObservers(func) {
    this.connectionManager.subscribeTurnObservers(func);
  }

  unsubscribeTurnObservers(func) {
    this.connectionManager.unsubscribeTurnObservers(func);
  }

  subscribeWinObservers(func) {
    this.connectionManager.subscribeWinObservers(func);
  }
  unsubscribeWinObservers(func) {
    this.connectionManager.unsubscribeWinObservers(func);
  }

  win() {
    this.connectionManager.win();
  }
  async checkTurn() {
    return this.connectionManager.checkTurn();
  }

  passTurn() {
    this.connectionManager.nextTurn();
  }



 /**
   * a
   * DEPRECATED
   * Hear an event
   * @param event name of the event
   * @param func function to execute
   * @returns the listener

  subscribe(event, func) {
    return this.connectionManager.subscribe(event, func);
  }
  */
  /**
   * DEPRECATED
  * Dispatch an event
  * @param ev name of the event
  * @param args data to send
  
  triggerEvent(ev, args) {
    this.connectionManager.triggerEvent(ev, args);
  }
  */

}

export default OnirixMultiplayerModule;
