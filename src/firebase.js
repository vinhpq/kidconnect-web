import firebase from "firebase";


const firebaseConfig = {
  apiKey: "AIzaSyDH-FJ2ONS6x_6QNHnRNNivw8F8BBu1E0Q",
  authDomain: "kidconnect-mamnonhuongduong.firebaseapp.com",
  databaseURL: "https://kidconnect-mamnonhuongduong.firebaseio.com",
  projectId: "kidconnect-mamnonhuongduong",
  storageBucket: "kidconnect-mamnonhuongduong.appspot.com",
  messagingSenderId: "121835713528",
  appId: "1:121835713528:web:f3a94d4fc5b46384395c0d",
  measurementId: "G-C1Z7LG8F2W"
};

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export { auth, provider };
  export default db;