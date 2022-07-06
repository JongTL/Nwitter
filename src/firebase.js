import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyCeX9d7sPVSm9DM2SJ4w1jXAZOxrGPmR3k",
    authDomain: "nwitter-dc23d.firebaseapp.com",
    projectId: "nwitter-dc23d",
    storageBucket: "nwitter-dc23d.appspot.com",
    messagingSenderId: "556206640171",
    appId: "1:556206640171:web:38d80ef444b5f93ac1ee6e"};

const app = initializeApp(firebaseConfig);

export default app;