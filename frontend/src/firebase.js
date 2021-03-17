import firebase from 'firebase/app'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyAKJR49BBipdrQExXSUAuArkGwouDVmLjo",
  authDomain: "pokecrud-94f44.firebaseapp.com",
  projectId: "pokecrud-94f44",
  storageBucket: "pokecrud-94f44.appspot.com",
  messagingSenderId: "1094734957153",
  appId: "1:1094734957153:web:89fcd32a2899cb7d4cf820"
};

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage()

export { storage }