(function () {
  var pressedKeys = {};

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

  // Listen for changes in player positions from Firebase
  database.ref("players/1").on("value", (snapshot) => {
    const data = snapshot.val();
    setKey({ keyCode: 37 }, data.left);
    setKey({ keyCode: 39 }, data.right);
    setKey({ keyCode: 38 }, data.up);
    setKey({ keyCode: 40 }, data.down);
    setKey({ keyCode: 88 }, data.x || data.y || data.a || data.b);
  });

  function setKey(event, status) {
    var code = event.keyCode;
    var key;

    switch (code) {
      case 32:
        key = "SPACE";
        break;
      case 37:
        key = "LEFT";
        break;
      case 38:
        key = "UP";
        break;
      case 39:
        key = "RIGHT";
        break;
      case 40:
        key = "DOWN";
        break;
      case 88:
        key = "JUMP";
        break;
      case 90:
        key = "RUN";
        break;
      default:
        key = String.fromCharCode(code);
    }

    pressedKeys[key] = status;
  }

  document.addEventListener("keydown", function (e) {
    setKey(e, true);
  });

  document.addEventListener("keyup", function (e) {
    setKey(e, false);
  });

  window.addEventListener("blur", function () {
    pressedKeys = {};
  });

  window.input = {
    isDown: function (key) {
      return pressedKeys[key.toUpperCase()];
    },
    reset: function () {
      pressedKeys["RUN"] = false;
      pressedKeys["LEFT"] = false;
      pressedKeys["RIGHT"] = false;
      pressedKeys["DOWN"] = false;
      pressedKeys["JUMP"] = false;
    },
  };
})();
