class EventManager {


  /**
   * Allow to control the scene content
   */
  embedSDK = '';
  /**
     * The diferents events can do with the embedsdk
     * TODO import this from the constants file
     */
  Events = {
    ENABLE: 'enable',
    DISABLE: 'disable',
    ROTATE: 'rotate',
    TOGGLE: 'toggle',
    SET_LABEL_TEXT: 'setLabelText',
    ENABLE_ALL: 'enableAll',
    DISABLE_ALL: 'disableAll',
    PLAY: 'play',
    PAUSE: 'pause',
    TRANSLATE: 'translate',
    ROTATE_TO: 'rotateTo',
    ROTATE_TO_QUATERNION: 'rotateToQuaternion',
    SCALE: 'scale',
    PLAY_ANIMATION: 'playAnimation',
    STOP_ANIMATION: 'stopAnimation',
    TRANSLATE_TO_POSITION: 'translateToPosition',
    TRANSLATE_TO_ELEMENT: 'translateToElement',
    RESET_SCENES: 'resetScenes',
  };

  /**
   * Indicate the action send o recive from the server
   */
  ACTIONS = {
    SEND_ACTION: 'send-action',
    RECIVE_ACTION: 'recive-action',
  };

  constructor(sdk) {
    this.embedSDK = sdk;

  }


  init() {
    this.eventListeners = {};
    this.eventListenersCount = 0;
  }



  //manage publish events
  publish( data) {
    switch (data.action) {
      case this.Events.ENABLE:
        this.embedSDK.enable(
          data.element,
          data.transition != null ? data.transition : 0,
          data.time != null ? data.time : 1,
        );
        console.log("help");
        break;
      case this.Events.DISABLE:
        this.embedSDK.disable(
          data.element,
          data.transition != null ? data.transition : 0,
          data.time != null ? data.time : 1,
        );
        console.log("disable");
        break;
      case this.Events.ENABLE_ALL:
        this.embedSDK.enableAll();
        break;
      case this.Events.DISABLE_ALL:
        this.embedSDK.disableAll();
        break;
      case this.Events.ROTATE:
        this.embedSDK.rotate(
          data.element,
          data.x,
          data.y,
          data.z,
          data.time,
          data.loop,
        );
        break;
      case this.Events.TOGGLE:
        this.embedSDK.toggle(
          data.element,
          data.transition != null ? data.transition : 0,
          data.time != null ? data.time : 1,
        );
        break;
      case this.Events.SET_LABEL_TEXT:
        this.embedSDK.setLabelText(data.element, data.text);
        break;
      case this.Events.PLAY:
        this.embedSDK.play(data.element);
        break;
      case this.Events.PAUSE:
        this.embedSDK.pause(data.element);
        break;
      case this.Events.TRANSLATE:
        this.embedSDK.translate(
          data.element,
          data.x,
          data.y,
          data.z,
          data.time,
          data.loop,
        );
        break;
      case this.Events.ROTATE_TO:
        this.embedSDK.rotateTo(
          data.element,
          data.x,
          data.y,
          data.z,
          data.time,
          data.loop,
        );
        break;
      case this.Events.ROTATE_TO_QUATERNION:
        this.embedSDK.rotateToQuaternion(
          data.element,
          data.x,
          data.y,
          data.z,
          data.w,
          data.time,
          data.loop,
        );
        break;
      case this.Events.SCALE:
        this.embedSDK.scale(
          data.element,
          data.x,
          data.y,
          data.z,
          data.time,
          data.loop,
        );
        break;
      case this.Events.PLAY_ANIMATION:
        this.embedSDK.playAnimation(
          data.element,
          data.name,
          data.loop,
          data.autoStop != null ? data.autoStop : false,
          data.time,
        );
        break;
      case this.Events.STOP_ANIMATION:
        this.embedSDK(data.element);
        break;
      case this.Events.TRANSLATE_TO_POSITION:
        this.embedSDK.translateToPosition(
          data.element,
          data.x,
          data.y,
          data.z,
          data.time,
          data.lookAt,
        );
        break;
      case this.Events.TRANSLATE_TO_ELEMENT:
        this.embedSDK.translateToElement(
          data.element,
          data.target,
          data.time,
          data.lookAt,
        );
        break;
      case this.Events.RESET_SCENES:
        this.embedSDK.resetScenes();
        break;
      default:
        console.log('Event not found');
    }
  }


  addEventListener(ev, func) {
    if (!this.eventListeners[ev]) {
      this.eventListeners[ev] = [];
    }
    const listenerId = this.eventListenersCount++;
    this.eventListeners[ev].push({
      id: listenerId,
      func: func,
    });
    return listenerId;
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
    if (this.eventListeners[ev]) {
      this.eventListeners[ev].map((listener) => listener.func(args));
    }
  }




}

export { EventManager };
