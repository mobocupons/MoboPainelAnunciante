
importScripts('https://www.gstatic.com/firebasejs/8.6.5/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.6.5/firebase-messaging.js');

firebase.initializeApp({
    apiKey: "AIzaSyDnpz10tFxZhhXKwz-BiUVnaXYTzkArsmU",
    authDomain: "mobo-9c945.firebaseapp.com",
    databaseURL: "https://mobo-9c945.firebaseio.com",
    projectId: "mobo-9c945",
    storageBucket: "mobo-9c945.appspot.com",
    messagingSenderId: "453237689250",
    appId: "1:453237689250:web:436093176789ecda2000fb",
    measurementId: "G-HQ83YF2K3Q"
});

const messaging = firebase.messaging();

