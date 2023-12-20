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

  constructor(sdk) {
    this.embedSDK = sdk;

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
        console.log("Event: enable");
        break;
      case this.Events.DISABLE:
        this.embedSDK.disable(
          data.element,
          data.transition != null ? data.transition : 0,
          data.time != null ? data.time : 1,
        );
        console.log("Event: disable");
        break;
      case this.Events.ENABLE_ALL:
        this.embedSDK.enableAll();
        console.log("Event: enable all");
        break;
      case this.Events.DISABLE_ALL:
        this.embedSDK.disableAll();
        console.log("Event: disable all");
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
        console.log("Event: rotate");
        break;
      case this.Events.TOGGLE:
        this.embedSDK.toggle(
          data.element,
          data.transition != null ? data.transition : 0,
          data.time != null ? data.time : 1,
        );
        console.log("Event: toggle");
        break;
      case this.Events.SET_LABEL_TEXT:
        this.embedSDK.setLabelText(data.element, data.text);
        console.log("Event: set label text");
        break;
      case this.Events.PLAY:
        this.embedSDK.play(data.element);
        console.log("Event: play");
        break;
      case this.Events.PAUSE:
        this.embedSDK.pause(data.element);
        console.log("Event: pause");
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
        console.log("Event: translate");
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
        console.log("Event: rotate to");
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
        console.log("Event: rotate to quaternion");
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
        console.log("Event: scale");
        break;
      case this.Events.PLAY_ANIMATION:
        this.embedSDK.playAnimation(
          data.element,
          data.name,
          data.loop,
          data.autoStop != null ? data.autoStop : false,
          data.time,
        );
        console.log("Event: play animation");
        break;
      case this.Events.STOP_ANIMATION:
        this.embedSDK.stopAnimation(data.element);
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
        console.log("Event: translate to position");
        break;
      case this.Events.TRANSLATE_TO_ELEMENT:
        this.embedSDK.translateToElement(
          data.element,
          data.target,
          data.time,
          data.lookAt,
        );
        console.log("Event: translate to element");
        break;
      case this.Events.RESET_SCENES:
        this.embedSDK.resetScenes();
        console.log("Event: reset scenes");
        break;
      default:
        console.log('Action not found');
    }
  }

}

export { EventManager };
