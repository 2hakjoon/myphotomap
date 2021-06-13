import firebase from "firebase";
require('dotenv').config()

export const fireBaseInit = () => {
    firebase.initializeApp({
        apiKey: process.env.REACT_APP_FB_apiKey,
        authDomain: process.env.REACT_APP_FB_authDomain,
        projectId: process.env.REACT_APP_FB_projectId,
        storageBucket: process.env.REACT_APP_FB_storageBucket ,
        messagingSenderId: process.env.REACT_APP_FB_messagingSenderId,
        appId: process.env.REACT_APP_FB_appId,
        measurementId: process.env.REACT_APP_FB_measurementId 
    });
}
