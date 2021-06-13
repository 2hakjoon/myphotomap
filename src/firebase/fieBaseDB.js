import firebase from "firebase";


let db = "";

export const connectDB = () => {
    db = firebase.firestore();
}

export const FB_dbTest = () => {
    db.collection("users").add({
        test: "test",
    })
    .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
    });
}