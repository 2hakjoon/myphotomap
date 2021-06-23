import firebase from "firebase";
import { getEmail } from "./fireBaseAuth";


let db = "";

export const connectDB = () => {
    db = firebase.firestore();
}



export const FB_dbGetAlbums = async () => {
    const userdata = db.collection('users').doc(`${getEmail()}`);
    const doc = await userdata.get();
    if (!doc.exists) {
      return [""];
    } else {
      return doc.data();
    }
}

export const FB_dbUploadAlbums = async(data) => {
    //console.log(data)
    let albums = await FB_dbGetAlbums()
    albums[Object.keys(albums).length] = data;
    const docRef = db.collection('users').doc(`${getEmail()}`);
        await docRef.set({
            ...albums
        });
     
}