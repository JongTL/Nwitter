import { initializeApp } from 'firebase/app';
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCeX9d7sPVSm9DM2SJ4w1jXAZOxrGPmR3k",
    authDomain: "nwitter-dc23d.firebaseapp.com",
    projectId: "nwitter-dc23d",
    storageBucket: "nwitter-dc23d.appspot.com",
    messagingSenderId: "556206640171",
    appId: "1:556206640171:web:38d80ef444b5f93ac1ee6e"};

firebase.initializeApp(firebaseConfig);

export const firebaseInstance=firebase;

export const authService = firebase.auth();

export const dbService=firebase.firestore();