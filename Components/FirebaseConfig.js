  import * as firebase from 'firebase';
  var firebaseConfig = {
     apiKey: "AIzaSyAJ46Zpo5mLyyFhInxwmASGnDxs1ybl9lE",
     authDomain: "iotproject-802c9.firebaseapp.com",
     databaseURL: "https://iotproject-802c9.firebaseio.com",
     projectId: "iotproject-802c9",
     storageBucket: "iotproject-802c9.appspot.com",
     messagingSenderId: "658518817451",
     appId: "1:658518817451:web:6ab0b8f55f75029a6d95ee",
     measurementId: "G-HX7NK3C14H"
   };
   // Initialize Firebase
   //export const firebaseApp = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
   export const firebaseApp = firebase.initializeApp(firebaseConfig);