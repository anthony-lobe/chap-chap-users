
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/auth';
import { getFirestore } from '@firebase/firestore';




export const firebaseConfig = {
    apiKey: "AIzaSyBu0J5OknD7yEIdrzSdOTFMml1RCRVWEes",
    authDomain: "chap-chap-app.firebaseapp.com",
    projectId: "chap-chap-app",
    storageBucket: "chap-chap-app.appspot.com",
    messagingSenderId: "627161855460",
    appId: "1:627161855460:web:54715674dc895a607d83f1",
    measurementId: "G-K2X9E13JGG"
  };


let app;

if (firebase.apps.length === 0 ) {
    app = firebase.initializeApp(firebaseConfig)
} else {
    app = firebase.app()
}

export const db = getFirestore()

export {app}

export default firebase;