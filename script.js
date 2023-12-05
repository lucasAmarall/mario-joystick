window.addEventListener("load", () => {
  const $ = (e) => document.querySelectorAll(e);
  // ADD YOU FIREBASE CONFIG
  const firebaseConfig = {
    apiKey: "#########",
    authDomain: "#########",
    databaseURL: "#########",
    projectId: "#########",
    storageBucket: "#########",
    messagingSenderId: "#########",
    appId: "#########",
    measurementId: "#########",
  };

  firebase.initializeApp(firebaseConfig);
  const database = firebase.database();
  let positionX = 0;
  let positionY = 0;
  let control = {
    up: false,
    down: false,
    left: false,
    right: false,
  };

  setInterval(() => {
    database.ref("game/1").set(control);
  }, 1000 / 60);

  database.ref("game/1").on("value", (snapshot) => {
    const data = snapshot.val();
    if (data) {
      positionX = data.positionX;
      positionY = data.positionY;
    }
  });

  const handleButtonRelease = (element) => {
    control[element.dataset.action] = false;
    element.classList.remove("box__circle--pressing");
  };

  const handleButtonPress = (element) => {
    control[element.dataset.action] = true;
    element.classList.add("box__circle--pressing");
    var audio = new Audio("click_sound.mp3");
    audio.play();
  };

  $(".box__circle").forEach((e) => {
    e.addEventListener("touchstart", () => handleButtonPress(e));
    e.addEventListener("touchend", () => handleButtonRelease(e));
  });
});
