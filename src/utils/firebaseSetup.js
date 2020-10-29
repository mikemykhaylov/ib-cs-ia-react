import firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCbm__iPgWpFvM3xVuJfltLGEcHl2KS2Zs',
  authDomain: 'dywizjon-303.firebaseapp.com',
  databaseURL: 'https://dywizjon-303.firebaseio.com',
  projectId: 'dywizjon-303',
  storageBucket: 'dywizjon-303.appspot.com',
  messagingSenderId: '69401916518',
  appId: '1:69401916518:web:80b85fc2d712f8063e69a7',
};

firebase.initializeApp(firebaseConfig);

export default firebase;
