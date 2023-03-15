import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC10ZrrE4DRqeNtEGuorJYkce09orbwthg",
  authDomain: "recipt-37348.firebaseapp.com",
  projectId: "recipt-37348",
  storageBucket: "recipt-37348.appspot.com",
  messagingSenderId: "594321678587",
  appId: "1:594321678587:web:e805906aea2c56c755905e",
  measurementId: "G-VD3MX0RBK1"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
