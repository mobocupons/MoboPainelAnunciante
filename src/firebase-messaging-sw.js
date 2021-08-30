
importScripts('https://www.gstatic.com/firebasejs/8.7.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.7.1/firebase-messaging.js');

firebase.initializeApp({
    apiKey: "AIzaSyCKNFgPaId7RyUxPZAfOsJwAfq11RUAAUs",
    authDomain: "mobo-dev.firebaseapp.com",
    projectId: "mobo-dev",
    storageBucket: "mobo-dev.appspot.com",
    messagingSenderId: "847390921940",
    appId: "1:847390921940:web:85d469e0725800f2e79741",
    measurementId: "G-99X8T051PQ"
  });

const messaging = firebase.messaging();

// EventEmitter.listen('push', data=>{console.log(data)})
// messaging.onBackgroundMessage( (payload) => {
//     console.log(payload)
//     let audio = new Audio();
//         audio.src = "src/assets/audio/NewMessage.mp3";
//         audio.load();
//         audio.play();
//   })
