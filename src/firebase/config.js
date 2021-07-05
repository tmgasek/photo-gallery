import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore';

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: 'AIzaSyBeJyB4XqvTp53lD-HWb9DmGvm7asYMEDA',
  authDomain: 'firegram-3b8af.firebaseapp.com',
  projectId: 'firegram-3b8af',
  storageBucket: 'firegram-3b8af.appspot.com',
  messagingSenderId: '891231201125',
  appId: '1:891231201125:web:54327f848ccf4de366a38c',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const projectStorage = firebase.storage();
const projectFirestore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { projectStorage, projectFirestore, timestamp };
