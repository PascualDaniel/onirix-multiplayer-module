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

  constructor(document = typeof window !== 'undefined' ? window.document : undefined, embedSDKp, url) {
    
    if (url != null) {
      this.SOCKET_URL = url;
    }

    this.embedSDK = embedSDKp;

    if (embedSDKp == null) {
      //default embedSDK
      this.embedSDK = new OnirixEmbedSDK(document,"http://127.0.0.1:5500" );
    }

    this.embedSDK.connect();


    this.connectionManager = new ConnectionManager(this.SOCKET_URL, this.embedSDK);

  }


  async joinSession(roomName) {
    return this.connectionManager.joinRoom(roomName);
  }
  async createSession(roomName) {
    return this.connectionManager.createRoom(roomName);
  }
  async deleteSession() {
    return this.connectionManager.deleteRoom();
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

}

export default OnirixMultiplayerModule;
