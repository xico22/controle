import firebase from 'firebase/app/'
import 'firebase/firestore'
import 'firebase/auth'

// Initialize Firebase
var config = {
    apiKey: "AIzaSyCQtMow6iafQJOsiyUEunZJop1fbW-0gbE",
    authDomain: "entregaveis-218806.firebaseapp.com",
    databaseURL: "https://entregaveis-218806.firebaseio.com",
    projectId: "entregaveis-218806",
    storageBucket: "entregaveis-218806.appspot.com",
    messagingSenderId: "995507630117"
  };
  firebase.initializeApp(config);
  firebase.firestore().settings({timestampsInSnapshots: true})

  export default firebase;