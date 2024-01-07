import OnirixMultiplayerModule from '../dist/ox-multiplayer-module.esm.js'


const iframeElement = document.getElementById("your_iframe_id_here");


const oxMultiplayer = new OnirixMultiplayerModule(iframeElement);


function logger22(data) {
    console.log(`${Date.now()} ${data}`);
  }

function logger33(data) {
    console.log(`asasdads${Date.now()} ${data}`);
}

//subscribe to events
oxMultiplayer.subscribeStartObservers(logger22);
oxMultiplayer.subscribeTurnObservers(logger33);

const logger = document.getElementById("logger");

// Subscribe to events a button
const createbutton = document.getElementById("create-button");
const crea = document.getElementById("crea");
createbutton.addEventListener("click", () => {
    logger.innerHTML += "Creating room" +"\n";

    oxMultiplayer.createSession(crea.value).then((data) => {
        logger.innerHTML += data +"\n";
    });

});
//delete 
const deleteButton = document.getElementById("delete-button");

// Add an event listener to the delete button
deleteButton.addEventListener("click", () => {
    // Perform the delete operation here
    logger.innerHTML += "Delete room" +"\n";
    // For example, you can call a function to delete a session:
    oxMultiplayer.deleteSession().then((data) => {
        logger.innerHTML += data + "\n";
    });
});


const join = document.getElementById("join");
const joinbutton = document.getElementById("join-button");
joinbutton.addEventListener("click", () => {
    logger.innerHTML += "Joining room"+"\n";
    //logger.innerHTML += oxMultiplayer.joinSession("room")+"\n";
    oxMultiplayer.joinSession(join.value  ).then((data) => {
        logger.innerHTML += data +"\n";
    });
});

const leavebutton = document.getElementById("leave-button");
leavebutton.addEventListener("click", () => {
    logger.innerHTML += "Leaving room"+"\n";
    //logger.innerHTML +=  oxMultiplayer.leaveSession()+"\n";
    oxMultiplayer.leaveSession().then((data) => {
        logger.innerHTML += data +"\n";
    });
});

const startbutton = document.getElementById("start-button");
startbutton.addEventListener("click", () => {
    logger.innerHTML += "Starting game"+"\n";
   // logger.innerHTML += oxMultiplayer.startSession()+"\n";
    oxMultiplayer.startSession().then((data) => {
        logger.innerHTML += data +"\n";
    });
});

const publishbutton = document.getElementById("publish-button");
const publish = document.getElementById("publish");
const data = {
    event: "send-to-room",
    action: 'enable',
    element: "element",
    value: publish.value,
  }
publishbutton.addEventListener("click", () => {
    logger.innerHTML += "Publishing"+"\n";
   
    

    oxMultiplayer.publish(data).then((a) => {
        logger.innerHTML += a +"\n";
    });
});

const pruebabutton = document.getElementById("prueba-button");

pruebabutton.addEventListener("click", () => {
    logger.innerHTML += "Prueba"+"\n";
    oxMultiplayer.passTurn();


});
