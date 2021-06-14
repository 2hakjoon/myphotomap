import firebase from "firebase";
import { getEmail } from "./fireBaseAuth";


let db = "";

export const connectDB = () => {
    db = firebase.firestore();
}

export const FB_dbTest = async() => {
    const docRef = db.collection('users').doc(`${getEmail()}`);

        await docRef.set({
            photos : [
                {
                    lan : 33.517903,
                    lat : 126.823050,
                    photo: ["test", "teststs", "testststsetset"]
                },
                {
                    lan : 33.517903,
                    lat : 126.823050,
                    photo: ["test", "teststs", "testststsetset"]
                },
                {
                    lan : 33.517903,
                    lat : 126.823050,
                    photo: ["test", "teststs", "testststsetset"]
                },
                {
                    lan : 33.517903,
                    lat : 126.823050,
                    photo: ["test", "teststs", "testststsetset"]
                },
                {
                    lan : 33.517903,
                    lat : 126.823050,
                    photo: ["test", "teststs", "testststsetset"]
                },
                {
                    lan : 33.517903,
                    lat : 126.823050,
                    photo: ["test", "teststs", "testststsetset"]
                },
            ]
        });

        const userdata = db.collection('users').doc(`${getEmail()}`);
        const doc = await userdata.get();
        if (!doc.exists) {
          console.log('No such document!');
        } else {
          console.log('Document data:', doc.data());
        }
}