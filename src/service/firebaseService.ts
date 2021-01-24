import * as firebase from 'firebase';

// Optionally import the services that you want to use
import 'firebase/auth';

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyDnx7qLONUQ7DiSLNm-jd-Jp77wpR-NXLo',
  authDomain: 'pitchii-dev.firebaseapp.com',
  projectId: 'pitchii-dev',
  storageBucket: 'pitchii-dev.appspot.com',
  messagingSenderId: '884196736901',
  appId: '1:884196736901:web:56ceb9cbdccf9907e58eec',
  measurementId: 'G-4ZR7KWBTK3',
};

const config = (): Record<string, any> => firebaseConfig;
const run = (): firebase.app.App => firebase.initializeApp(firebaseConfig);

export default {
  config,
  run,
  ...firebase,
};
